namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.Users;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class AnalyticsController : ApiController
    {
        private readonly IUserService userService;

        public AnalyticsController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route(nameof(UsersCountByMonths))]
        public async Task<IEnumerable<UsersCountByMonthServiceModel>> UsersCountByMonths()
            => await this.userService.GetUserCountByMonthInfo();
    }
}
