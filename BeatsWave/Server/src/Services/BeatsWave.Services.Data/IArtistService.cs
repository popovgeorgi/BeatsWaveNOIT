namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IArtistService
    {
        Task<IEnumerable<T>> AllAsync<T>(int? count = null, int skip = 0);

        Task<T> DetailsAsync<T>(string userId);
    }
}
