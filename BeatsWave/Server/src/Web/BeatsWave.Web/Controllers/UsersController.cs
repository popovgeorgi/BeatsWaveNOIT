namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Users;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class UsersController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly IUserService userService;

        public UsersController(ICurrentUserService currentUser, IUserService userService)
        {
            this.currentUser = currentUser;
            this.userService = userService;
        }

        [HttpGet]
        [Route(nameof(Info))]
        [AllowAnonymous]
        public async Task<UserInfoServiceModel> Info()
            => await this.userService.GetInfo<UserInfoServiceModel>(this.currentUser.GetId());

        [HttpGet]
        [Route(nameof(Favourites))]
        public async Task<IEnumerable<UserFavouritesServiceModel>> Favourites()
            => await this.userService.GetLikedBeatsAsync<UserFavouritesServiceModel>(this.currentUser.GetId());

        [HttpGet]
        [Route(nameof(FavouritesByIds))]
        public async Task<int[]> FavouritesByIds()
            => await this.userService.GetLikedBeatsByIdsAsync(this.currentUser.GetId());
    }
}
