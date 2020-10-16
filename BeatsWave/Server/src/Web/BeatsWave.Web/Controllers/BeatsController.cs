namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Beats;
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
    }
}
