namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

    public class EventService : IEventService
    {
        private readonly IDeletableEntityRepository<Event> eventRepository;

        public EventService(IDeletableEntityRepository<Event> eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        public async Task<IEnumerable<T>> AllAsync<T>()
        {
            return await this.eventRepository
                .All()
                .OrderByDescending(x => x.ConductDate)
                .To<T>()
                .ToListAsync();
        }

        public async Task<IEnumerable<T>> ByUser<T>(string managerId)
        {
            return await this.eventRepository
                .All()
                .Where(e => e.ManagerId == managerId)
                .OrderByDescending(e => e.CreatedOn)
                .To<T>()
                .ToListAsync();
        }

        public async Task<int> CreateAsync(string name, string imageUrl, string venue, string phoneNumber, string email, string conductDate, string description, decimal? price, string managerId)
        {
            var newEvent = new Event
            {
                Name = name,
                ImageUrl = imageUrl,
                Venue = venue,
                PhoneNumber = phoneNumber,
                Email = email,
                ConductDate = DateTime.ParseExact(conductDate, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture),
                Description = description,
                Price = price,
                ManagerId = managerId,
            };

            await this.eventRepository.AddAsync(newEvent);

            await this.eventRepository.SaveChangesAsync();

            return newEvent.Id;
        }

        public async Task<Result> DeleteAsync(int eventId, string managerId)
        {
            var wantedEvent = await this.eventRepository
                .All()
                .FirstOrDefaultAsync(e => e.Id == eventId);

            if (wantedEvent == null)
            {
                return "Event does not exist";
            }

            if (wantedEvent.ManagerId != managerId)
            {
                return "You cannot delete an event that is not yours!";
            }

            this.eventRepository.Delete(wantedEvent);
            await this.eventRepository.SaveChangesAsync();

            return true;
        }

        public async Task<T> DetailsAsync<T>(int id)
        {
            return await this.eventRepository
                .All()
                .Where(e => e.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> PremiumAsync<T>()
        {
            var premiumEvents = this.eventRepository
                .All()
                .OrderBy(e => e.ConductDate)
                .Where(e => e.Manager.Subscription == Subscription.Premium && e.ConductDate > DateTime.Now);

            if (premiumEvents.Count() < 3)
            {
                var remaining = 3 - premiumEvents.Count();

                var remainingEvents = this.eventRepository
                    .All()
                    .Where(e => e.Manager.Subscription != Subscription.Premium && e.ConductDate > DateTime.Now)
                    .OrderBy(e => e.ConductDate)
                    .Take(remaining);

                if (remainingEvents.Count() == 0)
                {
                    return await premiumEvents
                        .To<T>()
                        .ToListAsync();
                }

                return await premiumEvents.Concat(remainingEvents)
                    .To<T>()
                    .ToListAsync();
            }
            else
            {
                return await premiumEvents
                    .Take(3)
                    .To<T>()
                    .ToListAsync();
            }
        }
    }
}
