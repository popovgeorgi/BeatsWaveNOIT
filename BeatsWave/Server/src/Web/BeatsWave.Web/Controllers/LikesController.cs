namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Likes;
    using Microsoft.AspNetCore.Mvc;

    public class LikesController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly ILikeService likeService;

        public LikesController(ICurrentUserService currentUser, ILikeService likeService)
        {
            this.currentUser = currentUser;
            this.likeService = likeService;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Beat(LikeRequestModel model)
            => await this.likeService.VoteAsync(model.BeatId, this.currentUser.GetId());

        [HttpGet]
        [Route("{beatId}")]
        public async Task<bool> IsALiker(int beatId)
            => await this.likeService.DoesUserLikeAsync(beatId, this.currentUser.GetId());
    }
}
