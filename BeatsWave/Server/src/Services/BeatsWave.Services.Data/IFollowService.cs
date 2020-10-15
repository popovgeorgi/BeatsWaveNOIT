namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface IFollowService
    {
        Task<Result> Follow(string userId, string followerId);

        Task<Result> UnFollow(string userId, string followerId);
    }
}
