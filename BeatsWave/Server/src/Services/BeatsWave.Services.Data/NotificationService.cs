namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

    public class NotificationService : INotificationService
    {
        private readonly IRepository<Notification> notificationsRepository;

        public NotificationService(IRepository<Notification> notificationsRepository)
        {
            this.notificationsRepository = notificationsRepository;
        }

        public async Task<IEnumerable<T>> ByUser<T>(string userId)
        {
            return await this.notificationsRepository
                .All()
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedOn)
                .To<T>()
                .ToListAsync();
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

        public async Task SeeNotificationsAsync(string userId)
        {
            var notifications = await this.notificationsRepository
                .All()
                .Where(n => n.UserId == userId)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                if (notification.IsSeen == false)
                {
                    notification.IsSeen = true;
                }
            }

            await this.notificationsRepository.SaveChangesAsync();
        }
    }
}
