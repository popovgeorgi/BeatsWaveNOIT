namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface ISubscriptionService
    {
        Task<Result> ChangeAsync(string userId, string subscription);
    }
}
