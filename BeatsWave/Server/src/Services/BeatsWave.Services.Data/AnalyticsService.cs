namespace BeatsWave.Services.Data
{
    using System;
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
        private readonly IRepository<Play> playsRepository;
        private readonly IDeletableEntityRepository<Like> likesRepository;

        public AnalyticsService(
            IDeletableEntityRepository<ApplicationUser> userRepository,
            IDeletableEntityRepository<Beat> beatRepository,
            IRepository<Play> playsRepository,
            IDeletableEntityRepository<Like> likesRepository)
        {
            this.userRepository = userRepository;
            this.beatRepository = beatRepository;
            this.playsRepository = playsRepository;
            this.likesRepository = likesRepository;
        }

        public async Task<UsersAnalyticsResponseModel> GetUserCountByMonthInfo()
        {
            var usersByMonth = await this.userRepository
                .All()
                .Where(u => u.CreatedOn.Year == DateTime.Now.Year)
                .GroupBy(x => new { x.CreatedOn.Month })
                .Select(u => new UsersCountByMonthServiceModel
                {
                    Month = u.Key.Month.ToString(),
                    UsersCount = u.Count(),
                })
                .ToListAsync();

            var userOutput = new int[12];
            var totalUserCount = 0;

            foreach (var purchase in usersByMonth)
            {
                int month = int.Parse(purchase.Month) - 1;
                userOutput[month] = purchase.UsersCount;
                totalUserCount += purchase.UsersCount;
            }

            return new UsersAnalyticsResponseModel
            {
                UsersPerMonth = userOutput,
                TotalCount = totalUserCount,
            };
        }

        public async Task<BeatsAnalyticsResponseModel> GetBeatCountByMonthInfo()
        {
            var beatsByMonth = await this.beatRepository
                .All()
                .Where(b => b.CreatedOn.Year == DateTime.Now.Year)
                .GroupBy(x => new { x.CreatedOn.Month })
                .Select(u => new BeatsCountByMonthServiceModel
                {
                    Month = u.Key.Month.ToString(),
                    BeatsCount = u.Count(),
                })
                .ToListAsync();

            var beatOutput = new int[12];
            var totalBeatCount = 0;

            foreach (var purchase in beatsByMonth)
            {
                int month = int.Parse(purchase.Month) - 1;
                beatOutput[month] = purchase.BeatsCount;
                totalBeatCount += purchase.BeatsCount;
            }

            return new BeatsAnalyticsResponseModel
            {
                BeatsPerMonth = beatOutput,
                TotalCount = totalBeatCount,
            };
        }

        public async Task<PurchasesAnalyticsResponseModel> GetPurchasesByMonthInfo()
        {
            var purchasesByMonth = await this.beatRepository
                .All()
                .Where(b => b.IsSold == true && b.ModifiedOn.Value.Year == DateTime.Now.Year)
                .GroupBy(x => new { x.CreatedOn.Month })
                .Select(p => new PurchasesByMonthServiceModel
                {
                    Month = p.Key.Month.ToString(),
                    Purchases = p.Count(),
                })
                .ToListAsync();

            var purchaseOutput = new int[12];
            var totalPurchaseCount = 0;

            foreach (var purchase in purchasesByMonth)
            {
                int month = int.Parse(purchase.Month) - 1;
                purchaseOutput[month] = purchase.Purchases;
                totalPurchaseCount += purchase.Purchases;
            }

            return new PurchasesAnalyticsResponseModel
            {
                PurchasesPerMonth = purchaseOutput,
                TotalPurchases = totalPurchaseCount,
            };
        }

        public async Task<TotalEarningsAnalyticsResponseModel> GetTotalEarnings()
        {
            var totalEarnings = await this.beatRepository
                .All()
                .Where(b => b.IsSold)
                .SumAsync(b => b.Price);

            return new TotalEarningsAnalyticsResponseModel
            {
                TotalEarnings = totalEarnings,
            };
        }

        public async Task<DistinctUsersResponseModel> GetDistinctUsersListeningToUser(string userId)
        {
            var monthsOfDistinctUsers = await this.playsRepository
                .All()
                .Where(u => u.ProducerId == userId && u.CreatedOn.Year == DateTime.Now.Year)
                .GroupBy(k => new { k.ProducerId, k.PlayerId, k.CreatedOn.Month })
                .Select(p => p.Key.Month.ToString())
                .ToListAsync();

            var userOutput = new int[12];
            var totalUserCount = monthsOfDistinctUsers.Count;

            foreach (var month in monthsOfDistinctUsers)
            {
                userOutput[int.Parse(month) - 1]++;
            }

            return new DistinctUsersResponseModel
            {
                UsersPerMonth = userOutput,
                TotalCount = totalUserCount,
            };
        }

        public async Task<SongsByMonthsResponseModel> GetBeatsPerMonthOfUser(string producerId)
        {
            var beats = this.beatRepository
                .All()
                .Where(b => b.ProducerId == producerId && b.CreatedOn.Year == DateTime.Now.Year);

            var beatMonths = await beats
                .GroupBy(b => new { b.CreatedOn.Month })
                .Select(b => new BeatsCountByMonthServiceModel 
                {
                    Month = b.Key.Month.ToString(),
                    BeatsCount = b.Count(),
                })
                .ToListAsync();

            var userOutput = new int[12];

            foreach (var beatMonth in beatMonths)
            {
                userOutput[int.Parse(beatMonth.Month) - 1] = beatMonth.BeatsCount;
            }

            return new SongsByMonthsResponseModel
            {
                BeatsPerMonth = userOutput,
                TotalCount = beats.Count(),
            };
        }

        public async Task<LikesByMonthsResponseModel> GetLikesPerMonthOfUser(string producerId)
        {
            var likes = this.likesRepository
                .All()
                .Where(l => l.Beat.ProducerId == producerId && l.CreatedOn.Year == DateTime.Now.Year);

            var likesPerMonth = await likes
                .GroupBy(l => new { l.CreatedOn.Month })
                .Select(l => new LikesCountByMonthServiceModel
                {
                    Month = l.Key.Month.ToString(),
                    BeatsCount = l.Count(),
                })
                .ToListAsync();

            var likeOutput = new int[12];

            foreach (var month in likesPerMonth)
            {
                likeOutput[int.Parse(month.Month) - 1] = month.BeatsCount;
            }

            return new LikesByMonthsResponseModel
            {
                TotalCount = likes.Count(),
                LikesPerMonth = likeOutput,
            };
        }
    }
}
