namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Web.Models.Analytics;
    using Microsoft.EntityFrameworkCore;

    public class AnalyticsService : IAnalyticsService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Beat> beatRepository;

        public AnalyticsService(IDeletableEntityRepository<ApplicationUser> userRepository, IDeletableEntityRepository<Beat> beatRepository)
        {
            this.userRepository = userRepository;
            this.beatRepository = beatRepository;
        }

        public async Task<IEnumerable<BeatsCountByMonthServiceModel>> GetBeatCountByMonthInfo()
        {
            var beatsByMonth = await this.beatRepository
                .All()
                .GroupBy(x => new { x.CreatedOn.Month, x.CreatedOn.Year })
                .Select(u => new BeatsCountByMonthServiceModel
                {
                    Year = u.Key.Year.ToString(),
                    Month = u.Key.Month.ToString(),
                    BeatsCount = u.Count(),
                })
                .ToListAsync();

            return beatsByMonth;
        }

        public async Task<IEnumerable<PurchasesByMonthServiceModel>> GetPurchasesByMonthInfo()
        {
            var purchasesByMonth = await this.beatRepository
                .All()
                .Where(b => b.IsSold == true)
                .GroupBy(x => new { x.CreatedOn.Month, x.CreatedOn.Year })
                .Select(p => new PurchasesByMonthServiceModel
                {
                    Year = p.Key.Year.ToString(),
                    Month = p.Key.Month.ToString(),
                    Money = p.Sum(x => x.Price),
                })
                .ToListAsync();

            return purchasesByMonth;
        }

        public async Task<IEnumerable<UsersCountByMonthServiceModel>> GetUserCountByMonthInfo()
        {
            var usersByMonth = await this.userRepository
                .All()
                .GroupBy(x => new { x.CreatedOn.Month, x.CreatedOn.Year })
                .Select(u => new UsersCountByMonthServiceModel
                {
                    Year = u.Key.Year.ToString(),
                    Month = u.Key.Month.ToString(),
                    UsersCount = u.Count(),
                })
                .ToListAsync();

            return usersByMonth;
        }
    }
}
