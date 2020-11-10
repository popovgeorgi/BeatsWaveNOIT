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
            string biography)
        {
            var user = await this.userRepository
                .All()
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(p => p.Id == userId);

            if (user == null)
            {
                return "User does not exist";
            }

            this.ChangeProfile(
                user.Profile,
                firstName,
                lastName,
                displayName,
                location,
                biography);

            await this.userRepository.SaveChangesAsync();

            return true;
        }

        private void ChangeProfile(
            Profile profile,
            string firstName,
            string lastName,
            string displayName,
            string location,
            string biography)
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
