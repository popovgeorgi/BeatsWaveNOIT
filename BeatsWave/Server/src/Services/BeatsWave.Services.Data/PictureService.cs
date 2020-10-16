namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class PictureService : IPictureService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public PictureService(IDeletableEntityRepository<ApplicationUser> userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task SetMainPhotoToUser(string userId, string imageUrl)
        {
            var user = await this.userRepository
                .All()
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user.Profile.MainPhotoUrl != null)
            {
                // трябва да се изтрива снимката от storage-a
            }

            user.Profile.MainPhotoUrl = imageUrl;

            await this.userRepository.SaveChangesAsync();
        }
    }
}
