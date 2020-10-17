namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBeatService
    {
        Task<int> CreateAsync(string name, string beatUrl, string imageUrl, int price, string genre, int? bpm, string description, string producerId);

        Task<IEnumerable<T>> AllAsync<T>(int? count = null, int skip = 0);
    }
}
