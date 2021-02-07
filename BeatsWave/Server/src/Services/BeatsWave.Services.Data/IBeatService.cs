namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBeatService
    {
        Task<int> CreateAsync(string name, string beatUrl, string imageUrl, int price, string genre, int? bpm, string description, string producerId);

        Task<Result> UpdateAsync(string producerId, int beatId, string name, int? price, string genre, int? bpm, string description);

        Task<Result> DeleteAsync(string producerId, int beatId);

        Task<IEnumerable<T>> AllAsync<T>(int? count = null, int skip = 0);

        Task<T> DetailsAsync<T>(int id);

        Task<IEnumerable<T>> ByUser<T>(string userId);

        Task<IEnumerable<T>> ByLikes<T>();

        Task<IEnumerable<T>> ByGenre<T>(string genre, int? take = null, int skip = 0);

        Task<IEnumerable<T>> ByIds<T>(int[] ids);

        Task<Result> AddPlay(int beatId, string playerId);

        Task<IEnumerable<T>> MostTrending<T>();

        Task<IEnumerable<T>> FeaturedAsync<T>();

        Task<int> GetTotalCount();
    }
}
