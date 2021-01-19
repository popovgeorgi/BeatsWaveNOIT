namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public interface IEventService
    {
        Task<int> CreateAsync(string name, string imageUrl, string venue, string phoneNumber, string email, string conductDate, string description, decimal? price, string managerId);

        Task<IEnumerable<T>> AllAsync<T>();

        Task<T> DetailsAsync<T>(int id);

        Task<IEnumerable<T>> PremiumAsync<T>();
    }
}
