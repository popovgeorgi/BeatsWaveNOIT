namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface INotificationService
    {
        Task<int> CreateAsync(string userId, string initiatorId, string message, string type);

        Task<IEnumerable<T>> ByUser<T>(string userId);

        Task SeeNotificationsAsync(string userId);

        Task<T> GetNotificationById<T>(int notificationId);
    }
}
