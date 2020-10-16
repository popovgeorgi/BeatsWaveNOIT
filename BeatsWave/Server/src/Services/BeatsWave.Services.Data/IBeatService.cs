namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface IBeatService
    {
        Task<int> CreateAsync(string name, string beatUrl, string imageUrl, int price, string genre, int? bpm, string description, string producerId);
    }
}
