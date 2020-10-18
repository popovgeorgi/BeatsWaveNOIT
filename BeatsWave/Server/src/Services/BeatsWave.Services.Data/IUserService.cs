namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<T> GetInfo<T>(string id);
    }
}
