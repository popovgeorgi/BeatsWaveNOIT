namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface ILikeService
    {
        Task<bool> VoteAsync(int beatId, string userId);

        Task<bool> DoesUserLikeAsync(int beatId, string userId);
    }
}
