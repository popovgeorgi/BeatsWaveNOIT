namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    using BeatsWave.Services;
    using BeatsWave.Web.Models.Profile;

    public interface IProfileService
    {
        Task<ProfileServiceModel> ByUser(string userId);

        Task<Result> Update(
            string userId,
            string firstName,
            string lastName,
            string displayName,
            string location,
            string biography,
            string mainPhotoUrl
            );
    }
}
