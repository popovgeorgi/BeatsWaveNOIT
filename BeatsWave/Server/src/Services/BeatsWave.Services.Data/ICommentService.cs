namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Comments;

    public interface ICommentService
    {
        Task<T> CreateAsync<T>(int beatId, string userId, string content, int? parentId = null);

        Task<bool> IsInPostId(int commentId, int beatId);

        Task<IEnumerable<BeatCommentsServiceModel>> CommentsForBeat(int beatId);
    }
}
