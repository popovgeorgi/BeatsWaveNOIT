namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface INotificationService
    {
        Task CreateAsync(string userId, string initiatorId, string message, string type);
    }
}
