namespace BeatsWave.Services.CronJobs
{
    using BeatsWave.Services.CronJobs.Models;
    using Hangfire;
    using Hangfire.Server;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.ML;
    using Microsoft.ML.Trainers;

    public class TrainModelJob
    {
        private readonly IWebHostEnvironment webHostEnvironment;

        public TrainModelJob(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }


        [AutomaticRetry(Attempts = 2)]
        public void Work(PerformContext context)
        {
            var trainedModelFile = this.webHostEnvironment.ContentRootPath + "\\TrainedModel.zip";
            var dataModel = this.webHostEnvironment.ContentRootPath + "\\dataModel.csv";
            TrainModel(dataModel, trainedModelFile);
        }

        private static void TrainModel(string inputFile, string modelFile)
        {
            // Create MLContext to be shared across the model creation workflow objects
            var context = new MLContext();

            // Load data
            IDataView trainingDataView = context.Data.LoadFromTextFile<LikesForBeat>(
                inputFile,
                hasHeader: true,
                separatorChar: ',');

            // Build & train model
            IEstimator<ITransformer> estimator = context.Transforms.Conversion
                .MapValueToKey(outputColumnName: "userIdEncoded", inputColumnName: nameof(LikesForBeat.UserId)).Append(
                    context.Transforms.Conversion.MapValueToKey(outputColumnName: "beatIdEncoded", inputColumnName: nameof(LikesForBeat.BeatId)));
            var options = new MatrixFactorizationTrainer.Options
            {
                LossFunction = MatrixFactorizationTrainer.LossFunctionType.SquareLossOneClass,
                MatrixColumnIndexColumnName = "userIdEncoded",
                MatrixRowIndexColumnName = "beatIdEncoded",
                LabelColumnName = nameof(LikesForBeat.Label),
                Alpha = 0.1,
                Lambda = 0.5,
                NumberOfIterations = 50,
            };

            var trainerEstimator = estimator.Append(context.Recommendation().Trainers.MatrixFactorization(options));
            ITransformer model = trainerEstimator.Fit(trainingDataView);

            // Save model
            context.Model.Save(model, trainingDataView.Schema, modelFile);
        }
    }
}
