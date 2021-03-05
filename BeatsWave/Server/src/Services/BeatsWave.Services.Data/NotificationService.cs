namespace BeatsWave.Services.Data
{
    using System;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;

    public class NotificationService : INotificationService
    {
        private readonly IRepository<Notification> notificationsRepository;

        public NotificationService(IRepository<Notification> notificationsRepository)
        {
            this.notificationsRepository = notificationsRepository;
        }

        public async Task CreateAsync(string userId, string initiatorId, string message, string type)
        {
            var notification = new Notification
            {
                UserId = userId,
                InitiatorId = initiatorId,
                Message = message,
                Type = (NotificationType)Enum.Parse(typeof(NotificationType), type),
            };

            await this.notificationsRepository.AddAsync(notification);
            await this.notificationsRepository.SaveChangesAsync();
        }
    }
}
