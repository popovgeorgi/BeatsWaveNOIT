namespace BeatsWave.Services.Data
{
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;

    using System;
    using System.Threading.Tasks;

    public class EventService : IEventService
    {
        private readonly IDeletableEntityRepository<Event> eventRepository;

        public EventService(IDeletableEntityRepository<Event> eventRepository)
        {
            this.eventRepository = eventRepository;
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
                ConductDate = DateTime.ParseExact(conductDate, "yyyy-MM-dd HH:mm:ss,fff", System.Globalization.CultureInfo.InvariantCulture),
                Description = description,
                Price = price,
                ManagerId = managerId,
            };

            await this.eventRepository.AddAsync(newEvent);

            await this.eventRepository.SaveChangesAsync();

            return newEvent.Id;
        }
    }
}
