namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Subscriptions;
    using Microsoft.AspNetCore.Mvc;

    public class SubscriptionsController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly ISubscriptionService subscriptionService;

        public SubscriptionsController(ICurrentUserService currentUser, ISubscriptionService subscriptionService)
        {
            this.currentUser = currentUser;
            this.subscriptionService = subscriptionService;
        }

        [HttpPut]
        public async Task<ActionResult> Change(UpdateSubscriptionRequestModel model)
        {
            var userId = this.currentUser.GetId();

            var result = await this.subscriptionService.ChangeAsync(userId, model.Subscription);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
