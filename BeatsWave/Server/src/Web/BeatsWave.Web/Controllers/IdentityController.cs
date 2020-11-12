namespace BeatsWave.Web.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Common;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure;
    using BeatsWave.Web.Models.Identity;
    using BeatsWave.Web.Models.Users;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class IdentityController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IIdentityService identityService;
        private readonly IUserService userService;
        private readonly AppSettings appSettings;

        public IdentityController(
            UserManager<ApplicationUser> userManager,
            IIdentityService identityService,
            IOptions<AppSettings> appSettings,
            IUserService userService)
        {
            this.userManager = userManager;
            this.identityService = identityService;
            this.userService = userService;
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

            await this.userService.SetInitialValues(user.Id, model.UserName, GlobalConstants.DefaultMainPhotoUrl);

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

            var userFromDb = await this.userService.GetInfo<UserInfoServiceModel>(user.Id);

            return new LoginResponseModel
            {
                Id = user.Id,
                MainPhotoUrl = userFromDb.ProfileMainPhotoUrl,
                DisplayName = userFromDb.ProfileDisplayName,
                FirstName = userFromDb.ProfileFirstName,
                LastName = userFromDb.ProfileLastName,
                Role = userRole[0].ToString(),
                Token = token,
            };
        }
    }
}
