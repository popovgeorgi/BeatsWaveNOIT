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

        public Task<IEnumerable<ArtistListingServiceModel>> All()
            => this.artistService.All();
    }
}
