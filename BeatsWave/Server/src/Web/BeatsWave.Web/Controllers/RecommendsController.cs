namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Beats;
    using BeatsWave.Web.Models.Recommends;
    using Microsoft.AspNetCore.Mvc;

    public class RecommendsController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly IRecommendService recommendService;
        private readonly IBeatService beatService;

        public RecommendsController(
            ICurrentUserService currentUser,
            IRecommendService recommendService,
            IBeatService beatService)
        {
            this.currentUser = currentUser;
            this.recommendService = recommendService;
            this.beatService = beatService;
        }

        [HttpGet]
        public async Task<IEnumerable<RecommendedBeatServiceModel>> Recommend()
        {
            var beats = await this.beatService.AllAsync<BeatRecommendServiceModel>(100);

            // The Where statement here is in order to avoid recommending beats, produced by the same user
            var sortedBeats = beats.Where(b => b.ProducerId != this.currentUser.GetId());
            var recommendedIds = this.recommendService.RecommendToUser(this.currentUser.GetId(), sortedBeats);

            return await this.beatService.ByIds<RecommendedBeatServiceModel>(recommendedIds);
        }
    }
}
