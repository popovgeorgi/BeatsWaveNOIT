namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Services.Messaging;
    using BeatsWave.Web.Hubs;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Emails;
    using BeatsWave.Web.Models.Notifications;
    using BeatsWave.Web.Models.Users;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;

    using static BeatsWave.Common.GlobalConstants;

    public class EmailsController : ApiController
    {
        private readonly IEmailSender emailSender;
        private readonly IUserService userService;
        private readonly ICurrentUserService currentUser;
        private readonly INotificationService notificationService;
        private readonly IHubContext<NotificationHub> notificationHub;

        public EmailsController(
            IEmailSender emailSender,
            IUserService userService,
            ICurrentUserService currentUser,
            INotificationService notificationService,
            IHubContext<NotificationHub> notificationHub)
        {
            this.emailSender = emailSender;
            this.userService = userService;
            this.currentUser = currentUser;
            this.notificationService = notificationService;
            this.notificationHub = notificationHub;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail(SendEmailRequestModel emailRequestModel)
        {
            var sender = await this.userService.GetUserEmailById(this.currentUser.GetId());

            var result = await this.CheckIfUserExistsAsync(emailRequestModel.To);
            if (result == false)
            {
                return this.BadRequest();
            }

            await this.emailSender.SendEmailAsync(sender, "BeatsWave", emailRequestModel.To, "Someone is interested in buying your beat!", emailRequestModel.HtmlContent);

            // Sending notification to the user
            var targetUser = await this.userService.GetUserByEmailAsync<UserByEmailServiceModel>(emailRequestModel.To);
            var notificationId = await this.notificationService.CreateAsync(targetUser.Id, this.currentUser.GetId(), string.Format(EmailNotification, this.currentUser.GetUserName()), "Email");

            var notification = await this.notificationService.GetNotificationById<NotificationsByUserServiceModel>(notificationId);
            await this.notificationHub.Clients.User(targetUser.Id).SendAsync("NewNotificationReceived", notification);

            return this.Ok();
        }

        private async Task<bool> CheckIfUserExistsAsync(string to)
        {
            if (await this.userService.CheckIfUserEmailExists(to))
            {
                return true;
            }

            return false;
        }
    }
}
