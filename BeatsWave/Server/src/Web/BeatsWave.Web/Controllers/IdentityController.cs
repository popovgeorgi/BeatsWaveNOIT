namespace BeatsWave.Web.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Common;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure;
    using BeatsWave.Web.Models.Identity;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class IdentityController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IIdentityService identityService;
        private readonly AppSettings appSettings;

        public IdentityController(
            UserManager<ApplicationUser> userManager,
            IIdentityService identityService,
            IOptions<AppSettings> appSettings)
        {
            this.userManager = userManager;
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Register))]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.UserName,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return this.BadRequest(result.Errors);
            }

            user.Profile = new Profile(model.UserName);
            user.Profile.MainPhotoUrl = GlobalConstants.DefaultMainPhotoUrl;

            await this.userManager.AddToRoleAsync(user, model.Role);

            return this.Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return this.Unauthorized();
            }

            var userRole = await this.userManager.GetRolesAsync(user);

            var token = this.identityService.GenerateJwtToken(user.Id, user.UserName, userRole.FirstOrDefault(), this.appSettings.Secret);

            return new LoginResponseModel
            {
                Token = token,
            };
        }
    }
}
