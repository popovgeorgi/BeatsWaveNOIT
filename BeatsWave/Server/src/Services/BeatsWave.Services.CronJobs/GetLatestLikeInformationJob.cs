namespace BeatsWave.Services.CronJobs
{
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Web.Models.Likes;
    using CsvHelper;
    using Hangfire;
    using Hangfire.Server;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;

    public class GetLatestLikeInformationJob
    {
        private readonly IDeletableEntityRepository<Like> likeRepository;
        private readonly IWebHostEnvironment webHostEnvironment;

        public GetLatestLikeInformationJob(
            IDeletableEntityRepository<Like> likeRepository,
            IWebHostEnvironment webHostEnvironment)
        {
            this.likeRepository = likeRepository;
            this.webHostEnvironment = webHostEnvironment;
        }

        [AutomaticRetry(Attempts = 2)]
        public async Task Work(PerformContext context)
        {
            var latestLikes = await this.likeRepository
                .All()
                .Select(l => new LatestLikesServiceModel
                {
                    UserId = l.UserId,
                    BeatId = l.BeatId,
                })
                .ToListAsync();

            var modelPath = this.webHostEnvironment.ContentRootPath + "\\dataModel.csv";
            using (var writer = new StreamWriter(modelPath))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(latestLikes);
            }
        }
    }
}
