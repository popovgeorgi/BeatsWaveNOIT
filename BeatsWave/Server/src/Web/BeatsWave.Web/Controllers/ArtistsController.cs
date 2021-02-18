namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Models;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.Artists;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static BeatsWave.Common.GlobalConstants;

    public class ArtistsController : ApiController
    {
        private readonly IArtistService artistService;
        private readonly UserManager<ApplicationUser> userManager;

        public ArtistsController(IArtistService artistService, UserManager<ApplicationUser> userManager)
        {
            this.artistService = artistService;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]

        public async Task<IEnumerable<ArtistListingServiceModel>> All(int take, int skip)
        {
            var artists = await this.userManager.GetUsersInRoleAsync(BeatmakerRoleName);
            var administrators = await this.userManager.GetUsersInRoleAsync(AdministratorRoleName);
            foreach (var adminstrator in administrators)
            {
                artists.Add(adminstrator);
            }

            var artistsIds = artists.Select(a => a.Id).ToList();

            return await this.artistService.AllAsync<ArtistListingServiceModel>(artistsIds, take, skip);
        }

        [HttpGet]
        [Route(Id)]
        [AllowAnonymous]

        public async Task<ArtistDetailsServiceModel> Details(string id)
            => await this.artistService.DetailsAsync<ArtistDetailsServiceModel>(id);

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(Featured))]

        public async Task<IEnumerable<ArtistListingServiceModel>> Featured()
            => await this.artistService.FeaturedAsync<ArtistListingServiceModel>();

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(Trending))]

        public async Task<IEnumerable<ArtistListingServiceModel>> Trending()
            => await this.artistService.TrendingAsync<ArtistListingServiceModel>();
    }
}
