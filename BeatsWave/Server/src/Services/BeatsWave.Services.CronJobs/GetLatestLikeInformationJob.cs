namespace BeatsWave.Services.CronJobs
{
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Web.Models.Likes;
    using CsvHelper;
    using Hangfire;
    using Hangfire.Server;
    using Microsoft.EntityFrameworkCore;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    
    public class GetLatestLikeInformationJob
    {
        private readonly IDeletableEntityRepository<Like> likeRepository;

        public GetLatestLikeInformationJob(IDeletableEntityRepository<Like> likeRepository)
        {
            this.likeRepository = likeRepository;
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

            using (var writer = new StreamWriter("dataModel.csv"))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(latestLikes);
            }
        }
    }
}
