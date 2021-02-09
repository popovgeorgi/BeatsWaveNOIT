namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Services.Messaging;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Emails;
    using Microsoft.AspNetCore.Mvc;

    public class EmailsController : ApiController
    {
        private readonly IEmailSender emailSender;
        private readonly IUserService userService;
        private readonly ICurrentUserService currentUser;

        public EmailsController(
            IEmailSender emailSender,
            IUserService userService,
            ICurrentUserService currentUser)
        {
            this.emailSender = emailSender;
            this.userService = userService;
            this.currentUser = currentUser;
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
