namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Follows;
    using Microsoft.AspNetCore.Mvc;

    public class FollowsController : ApiController
    {
        private readonly IFollowService followService;
        private readonly ICurrentUserService currentUser;

        public FollowsController(IFollowService followService, ICurrentUserService currentUser)
        {
            this.followService = followService;
            this.currentUser = currentUser;
        }

        [HttpPost]
        public async Task<ActionResult> Follow(FollowRequestModel model)
        {
            var result = await this.followService.Follow(
                model.UserId,
                this.currentUser.GetId());

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
