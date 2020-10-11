namespace BeatsWave.Services.Data
{
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Web.Models.Profile;
    using Microsoft.EntityFrameworkCore;

    public class ProfileService : IProfileService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public ProfileService(IDeletableEntityRepository<ApplicationUser> userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<ProfileServiceModel> ByUser(string userId)
        {
            var user = await this.userRepository
                .All()
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(p => p.Id == userId);

            if (user.Profile == null)
            {
                user.Profile = new Profile(user.UserName);

                await this.userRepository.SaveChangesAsync();
            }

            return await this.userRepository
              .All()
              .Where(x => x.Id == userId)
              .Select(u => new ProfileServiceModel
              {
                  FirstName = u.Profile.FirstName,
                  LastName = u.Profile.LastName,
                  MainPhotoUrl = u.Profile.MainPhotoUrl,
                  DisplayName = u.Profile.DisplayName,
                  Biography = u.Profile.Biography,
                  Location = u.Profile.Location,
              })
              .FirstOrDefaultAsync();
        }

        public async Task<Result> Update(
            string userId,
            string firstName,
            string lastName,
            string displayName,
            string location,
            string biography,
            string mainPhotoUrl)
        {
            var user = await this.userRepository
                .All()
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(p => p.Id == userId);

            if (user == null)
            {
                return "User does not exist";
            }

            if (user.Profile == null)
            {
                user.Profile = new Profile(user.UserName);
            }

            this.ChangeProfile(
                user.Profile,
                firstName,
                lastName,
                displayName,
                location,
                biography,
                mainPhotoUrl);

            await this.userRepository.SaveChangesAsync();

            return true;
        }

        private void ChangeProfile(
            Profile profile,
            string firstName,
            string lastName,
            string displayName,
            string location,
            string biography,
            string mainPhotoUrl)
        {
            if (profile.FirstName != firstName)
            {
                profile.FirstName = firstName;
            }

            if (profile.Biography != biography)
            {
                profile.Biography = biography;
            }

            if (profile.LastName != lastName)
            {
                profile.LastName = lastName;
            }

            if (profile.MainPhotoUrl != mainPhotoUrl)
            {
                profile.MainPhotoUrl = mainPhotoUrl;
            }

            if (profile.DisplayName != displayName)
            {
                profile.DisplayName = displayName;
            }

            if (profile.Location != location)
            {
                profile.Location = location;
            }
        }
    }
}
