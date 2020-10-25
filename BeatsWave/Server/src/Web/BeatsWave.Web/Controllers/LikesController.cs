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

        public async Task<ActionResult<LikeResponseModel>> Beat(LikeRequestModel model)
        {
            var userId = this.currentUser.GetId();

            var isLiked = await this.likeService.VoteAsync(model.BeatId, userId);

            return new LikeResponseModel { IsLiked = isLiked };
        }
    }
}
