namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.Artists;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class ArtistsController : ApiController
    {
        private readonly IArtistService artistService;

        public ArtistsController(IArtistService artistService)
        {
            this.artistService = artistService;
        }

        [HttpGet]
        [AllowAnonymous]

        public async Task<IEnumerable<ArtistListingServiceModel>> All()
            => await this.artistService.AllAsync<ArtistListingServiceModel>(15);

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]

        public async Task<ArtistDetailsServiceModel> Details(string id)
            => await this.artistService.DetailsAsync<ArtistDetailsServiceModel>(id);
    }
}
