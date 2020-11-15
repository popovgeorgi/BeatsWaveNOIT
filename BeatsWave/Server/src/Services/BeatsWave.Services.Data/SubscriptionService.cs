namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class SubscriptionService : ISubscriptionService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public SubscriptionService(IDeletableEntityRepository<ApplicationUser> userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<Result> ChangeAsync(string userId, string subscription)
        {
            var user = await this.userRepository
                .All()
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync();

            var subscriptionAsEnum = (Subscription)Enum.Parse(typeof(Subscription), subscription);

            if (user.Subscription == subscriptionAsEnum)
            {
                return "You are already in this subscription!";
            }

            user.Subscription = subscriptionAsEnum;

            await this.userRepository.SaveChangesAsync();

            return true;
        }
    }
}
