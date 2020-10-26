namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface ICommentService
    {
        Task Create(int beatId, string userId, string content, int? parentId = null);

        Task<bool> IsInBeatId(int commentId, int beatId);
    }
}
