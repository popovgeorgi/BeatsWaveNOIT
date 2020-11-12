namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Hubs;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Beats;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;

    public class BeatsController : ApiController
    {
        private readonly IBeatService beatService;
        private readonly ICurrentUserService currentUser;
        private readonly IHubContext<FeedHub> feedHub;

        public BeatsController(IBeatService beatService, ICurrentUserService currentUser, IHubContext<FeedHub> feedHub)
        {
            this.beatService = beatService;
            this.currentUser = currentUser;
            this.feedHub = feedHub;
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

            await this.feedHub.Clients.All.SendAsync("NewBeatReceived", id);

            return this.Created(nameof(this.Create), id);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<BeatListingServiceModel>> All(int take, int skip)
            => await this.beatService.AllAsync<BeatListingServiceModel>(take, skip);

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<BeatDetailsServiceModel> Details(int id)
            => await this.beatService.DetailsAsync<BeatDetailsServiceModel>(id);

        [HttpGet]
        [Route(nameof(Mine))]
        public async Task<IEnumerable<BeatListingServiceModel>> Mine()
            => await this.beatService.ByUser<BeatListingServiceModel>(this.currentUser.GetId());
    }
}
