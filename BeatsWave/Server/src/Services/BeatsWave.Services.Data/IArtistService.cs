namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IArtistService
    {
        Task<IEnumerable<T>> AllAsync<T>(IEnumerable<string> artistsIds, int? count = null, int skip = 0);

        Task<T> DetailsAsync<T>(string userId);

        Task<IEnumerable<T>> FeaturedAsync<T>();

        Task<IEnumerable<T>> TrendingAsync<T>();

        Task<T> GetProducerByBeatIdAsync<T>(int beatId);
    }
}
