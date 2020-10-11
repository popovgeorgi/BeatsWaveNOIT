namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    public interface IPictureService
    {
        Task SetMainPhotoToUser(string userId, string imageUrl);
    }
}
