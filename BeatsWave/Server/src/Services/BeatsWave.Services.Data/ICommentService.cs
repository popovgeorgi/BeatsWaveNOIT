namespace BeatsWave.Services.Data
{
    using BeatsWave.Web.Models.Comments;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICommentService
    {
        Task Create(int beatId, string userId, string content, int? parentId = null);

        Task<bool> IsInPostId(int commentId, int beatId);

        Task<IEnumerable<BeatCommentsServiceModel>> CommentsForBeat(int beatId);
    }
}
