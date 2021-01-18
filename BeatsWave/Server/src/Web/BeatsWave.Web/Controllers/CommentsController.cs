namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Comments;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static BeatsWave.Common.GlobalConstants;

    public class CommentsController : ApiController
    {
        private readonly ICommentService commentService;
        private readonly ICurrentUserService currentUser;

        public CommentsController(ICommentService commentService, ICurrentUserService currentUser)
        {
            this.commentService = commentService;
            this.currentUser = currentUser;
        }

        [HttpPost]
        [Route(nameof(CreateBeatComment))]
        public async Task<ActionResult<BeatCommentResponseModel>> CreateBeatComment(CreateBeatCommentRequestModel model)
        {
            var parentId =
                model.ParentId == 0 ?
                (int?)null :
                model.ParentId;

            if (parentId.HasValue)
            {
                if (!await this.commentService.IsInBeatPostId(parentId.Value, model.BeatId))
                {
                    return this.BadRequest();
                }
            }

            return await this.commentService.CreateBeatCommentAsync<BeatCommentResponseModel>(model.BeatId, this.currentUser.GetId(), model.Content, parentId);
        }

        [HttpPost]
        [Route(nameof(CreateArtistComment))]
        public async Task<ActionResult<ArtistCommentResponseModel>> CreateArtistComment(CreateArtistCommentRequestModel model)
        {
            var parentId =
                model.ParentId == 0 ?
                (int?)null :
                model.ParentId;

            if (parentId.HasValue)
            {
                if (!await this.commentService.IsInArtistPostId(parentId.Value, model.ArtistId))
                {
                    return this.BadRequest();
                }
            }

            return await this.commentService.CreateArtistCommentAsync<ArtistCommentResponseModel>(model.ArtistId, this.currentUser.GetId(), model.Content, parentId);
        }

        [HttpGet]
        [Route(BeatCommentsRoute)]
        [AllowAnonymous]
        public async Task<IEnumerable<BeatCommentsServiceModel>> Beat(int id)
            => await this.commentService.CommentsForBeat(id);

        [HttpGet]
        [Route(ArtistCommentsRoute)]
        [AllowAnonymous]
        public async Task<IEnumerable<ArtistCommentsServiceModel>> Artist(string id)
            => await this.commentService.CommentsForArtist(id);
    }
}
