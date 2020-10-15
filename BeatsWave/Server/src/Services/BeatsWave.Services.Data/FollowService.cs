namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Security.Cryptography.X509Certificates;
    using System.Text;
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
    }
}
