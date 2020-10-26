namespace BeatsWave.Web.Controllers
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Comments;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult> Create(CreateCommentRequestModel model)
        {
            var parentId =
                model.ParentId == 0 ?
                (int?)null :
                model.ParentId;

            if (parentId.HasValue)
            {
                if (!await this.commentService.IsInPostId(parentId.Value, model.BeatId))
                {
                    return this.BadRequest();
                }
            }

            await this.commentService.Create(model.BeatId, this.currentUser.GetId(), model.Content, parentId);

            return this.Ok();
        }

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IEnumerable<BeatCommentsServiceModel>> Beat(int id)
            => await this.commentService.CommentsForBeat(id);
    }
}
