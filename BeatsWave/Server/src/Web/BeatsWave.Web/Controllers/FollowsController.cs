namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Hubs;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Follows;
    using BeatsWave.Web.Models.Notifications;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;

    using static BeatsWave.Common.GlobalConstants;

    public class FollowsController : ApiController
    {
        private readonly IFollowService followService;
        private readonly ICurrentUserService currentUser;
        private readonly INotificationService notificationService;
        private readonly IHubContext<NotificationHub> notificationHub;

        public FollowsController(
            IFollowService followService,
            ICurrentUserService currentUser,
            INotificationService notificationService,
            IHubContext<NotificationHub> notificationHub)
        {
            this.followService = followService;
            this.currentUser = currentUser;
            this.notificationService = notificationService;
            this.notificationHub = notificationHub;
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

            var notificationId = await this.notificationService.CreateAsync(model.UserId, this.currentUser.GetId(), string.Format(FollowNotification, this.currentUser.GetUserName()), "Follow");

            var notification = await this.notificationService.GetNotificationById<NotificationsByUserServiceModel>(notificationId);
            await this.notificationHub.Clients.User(model.UserId).SendAsync("NewNotificationReceived", notification);

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
