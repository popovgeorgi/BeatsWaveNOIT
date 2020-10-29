namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

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
    }
}
