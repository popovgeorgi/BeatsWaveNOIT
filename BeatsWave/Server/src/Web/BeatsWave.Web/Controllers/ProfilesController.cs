namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Profile;
    using Microsoft.AspNetCore.Mvc;

    public class ProfilesController : ApiController
    {
        private readonly IProfileService profileService;
        private readonly ICurrentUserService currentUser;

        public ProfilesController(
            IProfileService profileService,
            ICurrentUserService currentUser)
        {
            this.profileService = profileService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        public async Task<ActionResult<ProfileServiceModel>> Mine()
            => await this.profileService.ByUser(this.currentUser.GetId());

        [HttpPut]
        public async Task<ActionResult> Update(UpdateProfileRequestModel model)
        {
            var userId = this.currentUser.GetId();

            var result = await this.profileService.Update(
                userId,
                model.FirstName,
                model.LastName,
                model.DisplayName,
                model.Location,
                model.Biography);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
