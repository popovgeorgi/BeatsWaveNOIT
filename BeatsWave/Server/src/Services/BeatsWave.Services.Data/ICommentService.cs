namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Comments;

    public interface ICommentService
    {
        Task<T> CreateBeatCommentAsync<T>(int beatId, string userId, string content, int? parentId = null);

        Task<T> CreateArtistCommentAsync<T>(string artistId, string userId, string content, int? parentId = null);

        Task<bool> IsInBeatPostId(int commentId, int beatId);

        Task<bool> IsInArtistPostId(int commentId, string artistId);

        Task<IEnumerable<BeatCommentsServiceModel>> CommentsForBeat(int beatId);

        Task<IEnumerable<ArtistCommentsServiceModel>> CommentsForArtist(string artistId);
    }
}
