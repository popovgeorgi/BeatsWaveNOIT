namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Follows;
    using Microsoft.AspNetCore.Mvc;

    using static BeatsWave.Common.GlobalConstants;

    public class FollowsController : ApiController
    {
        private readonly IFollowService followService;
        private readonly ICurrentUserService currentUser;
        private readonly INotificationService notificationService;

        public FollowsController(
            IFollowService followService,
            ICurrentUserService currentUser,
            INotificationService notificationService)
        {
            this.followService = followService;
            this.currentUser = currentUser;
            this.notificationService = notificationService;
        }

        [HttpPost]
        [Route(nameof(Follow))]
        public async Task<ActionResult> Follow(FollowRequestModel model)
        {
            var result = await this.followService.Follow(
                model.UserId,
                this.currentUser.GetId());

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            await this.notificationService.CreateAsync(model.UserId, this.currentUser.GetId(), string.Format(FollowNotification, this.currentUser.GetUserName()), "Follow");

            return this.Ok();
        }

        [HttpPost]
        [Route(nameof(UnFollow))]
        public async Task<ActionResult> UnFollow(FollowRequestModel model)
        {
            var result = await this.followService.UnFollow(
                model.UserId,
                this.currentUser.GetId());

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<bool> IsAFollower(string id)
            => await this.followService.IsAFollower(this.currentUser.GetId(), id);
    }
}
