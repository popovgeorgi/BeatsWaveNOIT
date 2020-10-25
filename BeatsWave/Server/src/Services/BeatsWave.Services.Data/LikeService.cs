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

    public class LikeService : ILikeService
    {
        private readonly IDeletableEntityRepository<Like> likeRepository;
        private readonly IDeletableEntityRepository<Beat> beatRepository;

        public LikeService(IDeletableEntityRepository<Like> likeRepository, IDeletableEntityRepository<Beat> beatRepository)
        {
            this.likeRepository = likeRepository;
            this.beatRepository = beatRepository;
        }

        public async Task<bool> DoesUserLikeAsync(int beatId, string userId)
            => await this.likeRepository.All()
                .AnyAsync(l => l.BeatId == beatId && l.UserId == userId);

        public async Task<bool> VoteAsync(int beatId, string userId)
        {
            bool isLiked = true;

            var like = await this.likeRepository
                .All()
                .FirstOrDefaultAsync(x => x.BeatId == beatId && x.UserId == userId);

            if (like == null)
            {
                like = new Like
                {
                    BeatId = beatId,
                    UserId = userId,
                };

                await this.likeRepository.AddAsync(like);
            }
            else
            {
                this.likeRepository.Delete(like);

                isLiked = false;
            }

            await this.likeRepository.SaveChangesAsync();
            return isLiked;
        }
    }
}
