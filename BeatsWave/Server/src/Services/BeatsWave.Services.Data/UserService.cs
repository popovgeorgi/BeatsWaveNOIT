namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;

    using BeatsWave.Common;
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Models.Users;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.VisualBasic;

    public class UserService : IUserService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Like> likeRepository;

        public UserService(IDeletableEntityRepository<ApplicationUser> userRepository, IDeletableEntityRepository<Like> likeRepository)
        {
            this.userRepository = userRepository;
            this.likeRepository = likeRepository;
        }

        public async Task<T> GetInfo<T>(string id)
            => await this.userRepository
                .All()
                .Where(u => u.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

        public async Task<IEnumerable<T>> GetLikedBeatsAsync<T>(string userId)
        {
            return await this.likeRepository
               .All()
               .Where(x => x.UserId == userId)
               .Include(l => l.Beat)
               .To<T>()
               .ToListAsync();
        }

        public async Task<IEnumerable<UsersCountByMonthServiceModel>> GetUserCountByMonthInfo()
        {
            var information = await this.userRepository
                .All()
                .GroupBy(x => new { x.CreatedOn.Month, x.CreatedOn.Year })
                .Select(u => new UsersCountByMonthServiceModel
                {
                    Year = u.Key.Year.ToString(), 
                    Month = u.Key.Month.ToString(),
                    UsersCount = u.Count(),
                })
                .ToListAsync();

            return information;
        }

        public async Task SetInitialValues(string id, string displayName, string profilePicture)
        {
            var user = await this.userRepository
                .All()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            user.Profile = new Profile(displayName);
            user.Profile.MainPhotoUrl = GlobalConstants.DefaultMainPhotoUrl;

            await this.userRepository.SaveChangesAsync();
        }
    }
}
