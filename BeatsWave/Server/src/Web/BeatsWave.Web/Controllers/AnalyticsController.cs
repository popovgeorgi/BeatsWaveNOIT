namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.Analytics;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class AnalyticsController : ApiController
    {
        private readonly IAnalyticsService analyticsService;

        public AnalyticsController(IAnalyticsService analyticsService)
        {
            this.analyticsService = analyticsService;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(UsersCountByMonths))]
        public async Task<IEnumerable<UsersCountByMonthServiceModel>> UsersCountByMonths()
            => await this.analyticsService.GetUserCountByMonthInfo();

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(BeatsCountByMonths))]
        public async Task<IEnumerable<BeatsCountByMonthServiceModel>> BeatsCountByMonths()
            => await this.analyticsService.GetBeatCountByMonthInfo();
    }
}
