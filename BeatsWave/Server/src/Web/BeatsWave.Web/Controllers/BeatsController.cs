namespace BeatsWave.Web.Controllers
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Beats;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class BeatsController : ApiController
    {
        private readonly IBeatService beatService;
        private readonly ICurrentUserService currentUser;

        public BeatsController(IBeatService beatService, ICurrentUserService currentUser)
        {
            this.beatService = beatService;
            this.currentUser = currentUser;
        }

        [HttpPost]
        [Authorize(Roles = "Beatmaker, Administrator")]
        public async Task<IActionResult> Create(CreateBeatRequestModel model)
        {
            var producerId = this.currentUser.GetId();

            var id = await this.beatService.CreateAsync(
                model.Name,
                model.BeatUrl,
                model.ImageUrl,
                model.Price,
                model.Genre,
                model.Bpm,
                model.Description,
                producerId);

            return this.Created(nameof(this.Create), id);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<BeatListingServiceModel>> All(int take)
            => await this.beatService.AllAsync<BeatListingServiceModel>(take);

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<BeatDetailsServiceModel> Details(int id)
            => await this.beatService.DetailsAsync<BeatDetailsServiceModel>(id);
    }
}
