namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class FollowService : IFollowService
    {
        private readonly IRepository<Follow> followRepository;

        public FollowService(IRepository<Follow> followRepository)
        {
            this.followRepository = followRepository;
        }

        public async Task<Result> Follow(string userId, string followerId)
        {
            if (userId == followerId)
            {
                return "You cannot follow yourself!";
            }

            var userAlreadyFollowed = await this.followRepository
                .All()
                .AnyAsync(x => x.UserId == userId && x.FollowerId == followerId);

            if (userAlreadyFollowed)
            {
                return "This user is already followed";
            }

            await this.followRepository.AddAsync(new Follow
            {
                UserId = userId,
                FollowerId = followerId,
            });

            await this.followRepository.SaveChangesAsync();

            return true;
        }

        public async Task<Result> UnFollow(string userId, string followerId)
        {
            if (userId == followerId)
            {
                return "You cannot unfollow yourself!";
            }

            var userAlreadyFollowed = await this.followRepository
                .All()
                .AnyAsync(x => x.UserId == userId && x.FollowerId == followerId);

            if (!userAlreadyFollowed)
            {
                return "You must follow the user in order to unfollow him!";
            }

            var follow = await this.followRepository
                .All()
                .FirstOrDefaultAsync(f => f.UserId == userId && f.FollowerId == followerId);

            this.followRepository.Delete(follow);

            await this.followRepository.SaveChangesAsync();

            return true;
        }
    }
}
