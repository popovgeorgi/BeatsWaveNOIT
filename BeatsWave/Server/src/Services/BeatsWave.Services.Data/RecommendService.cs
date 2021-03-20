namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;

    using BeatsWave.Services.CronJobs.Models;
    using BeatsWave.Web.Models.Beats;
    using BeatsWave.Web.Models.Recommends;
    using Microsoft.ML;

    public class RecommendService : IRecommendService
    {
        public int[] RecommendToUser(string userId, IEnumerable<BeatRecommendServiceModel> beats)
        {
            var context = new MLContext();
            var model = context.Model.Load("TrainedModel.zip", out _);
            var predictionEngine = context.Model.CreatePredictionEngine<LikesForBeat, UserWithBeatScore>(model);

            var testModelData = LoadTestModelData(userId, beats);

            var bestResults = new Dictionary<int, float>();
            foreach (var testInput in testModelData)
            {
                var prediction = predictionEngine.Predict(testInput);
                bestResults[testInput.BeatId] = prediction.Score;
            }

            var sortedResults = bestResults.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value).Take(8);

            var beatIds = new int[8];
            int index = 0;
            foreach (var beat in sortedResults)
            {
                // In some rare cases the result from model can be "NaN" so here I am avoiding those results
                if (beat.Value.ToString() != "NaN")
                {
                    beatIds[index] = beat.Key;
                    index++;
                }
            }

            return beatIds;
        }

        private static List<LikesForBeat> LoadTestModelData(string userId, IEnumerable<BeatRecommendServiceModel> beats)
        {
            var list = new List<LikesForBeat>();

            foreach (var beat in beats)
            {
                list.Add(new LikesForBeat
                {
                    UserId = userId,
                    BeatId = beat.Id,
                });
            }

            return list;
        }
    }
}
