namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Notifications;
    using Microsoft.AspNetCore.Mvc;

    public class NotificationsController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly INotificationService notificationService;

        public NotificationsController(
            ICurrentUserService currentUser,
            INotificationService notificationService)
        {
            this.currentUser = currentUser;
            this.notificationService = notificationService;
        }

        [HttpGet]
        public async Task<IEnumerable<NotificationsByUserServiceModel>> Mine()
            => await this.notificationService.ByUser<NotificationsByUserServiceModel>(this.currentUser.GetId());

        [HttpPut]
        public async Task<ActionResult> MakeNotificationsSeen()
        {
            await this.notificationService.SeeNotificationsAsync(this.currentUser.GetId());

            return this.Ok();
        }
    }
}
