namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Analytics;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class AnalyticsController : ApiController
    {
        private readonly IAnalyticsService analyticsService;
        private readonly ICurrentUserService currentUser;

        public AnalyticsController(
            IAnalyticsService analyticsService,
            ICurrentUserService currentUser)
        {
            this.analyticsService = analyticsService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(UsersCountByMonths))]
        public async Task<UsersAnalyticsResponseModel> UsersCountByMonths()
            => await this.analyticsService.GetUserCountByMonthInfo();

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(BeatsCountByMonths))]
        public async Task<BeatsAnalyticsResponseModel> BeatsCountByMonths()
            => await this.analyticsService.GetBeatCountByMonthInfo();

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(PurchasesByMonths))]
        public async Task<PurchasesAnalyticsResponseModel> PurchasesByMonths()
            => await this.analyticsService.GetPurchasesByMonthInfo();

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(TotalEarnings))]
        public async Task<TotalEarningsAnalyticsResponseModel> TotalEarnings()
            => await this.analyticsService.GetTotalEarnings();

        [HttpGet]
        [Authorize(Roles = "Beatmaker, Administrator")]
        [Route(nameof(DistinctUsers))]
        public async Task<DistinctUsersResponseModel> DistinctUsers()
        {
            var currentUser = this.currentUser.GetId();

            return await this.analyticsService.GetDistinctUsersListeningToUser(currentUser);
        }

        [HttpGet]
        [Authorize(Roles = "Beatmaker, Administrator")]
        [Route(nameof(BeatsByMonths))]

        public async Task<SongsByMonthsResponseModel> BeatsByMonths()
        {
            var currentUser = this.currentUser.GetId();

            return await this.analyticsService.GetBeatsPerMonthOfUser(currentUser);
        }

        [HttpGet]
        [Authorize(Roles = "Beatmaker, Administrator")]
        [Route(nameof(LikesByMonths))]
        public async Task<LikesByMonthsResponseModel> LikesByMonths()
        {
            var currentUser = this.currentUser.GetId();

            return await this.analyticsService.GetLikesPerMonthOfUser(currentUser);
        }
    }
}
