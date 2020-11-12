namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.FeedHub;

    public interface IBeatService
    {
        Task<int> CreateAsync(string name, string beatUrl, string imageUrl, int price, string genre, int? bpm, string description, string producerId);

        Task<IEnumerable<T>> AllAsync<T>(int? count = null, int skip = 0);

        Task<T> DetailsAsync<T>(int id);

        Task<IEnumerable<T>> ByUser<T>(string userId);

        Task<CheckResult> GetUpdate(int firstBeatId);
    }
}
