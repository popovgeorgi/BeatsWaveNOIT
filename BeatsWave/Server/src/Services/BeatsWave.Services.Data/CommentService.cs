namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Models.Comments;
    using Microsoft.EntityFrameworkCore;

    public class CommentService : ICommentService
    {
        private readonly IDeletableEntityRepository<BeatComment> beatCommentsRepository;

        public CommentService(IDeletableEntityRepository<BeatComment> beatCommentsRepository)
        {
            this.beatCommentsRepository = beatCommentsRepository;
        }

        public async Task<IEnumerable<BeatCommentsServiceModel>> CommentsForBeat(int beatId)
        {
            return await this.beatCommentsRepository
                .All()
                .Where(x => x.BeatId == beatId && x.ParentId == null)
                .Select(x => new BeatCommentsServiceModel
                {
                    UserUserName = x.User.UserName,
                    UserId = x.UserId,
                    ImageUrl = x.User.Profile.MainPhotoUrl,
                    Content = x.Content,
                    Id = x.Id,
                    Children = this.beatCommentsRepository.All()
                        .Where(c => c.ParentId == x.Id)
                        .Select(c => new BeatCommentChildrenResponseModel
                        {
                            Id = c.Id,
                            Content = c.Content,
                            ImageUrl = c.User.Profile.MainPhotoUrl,
                            UserUserName = c.User.UserName,
                            UserId = c.UserId,
                        })
                        .ToList(),
                })
                .ToListAsync();
        }

        public async Task<T> CreateAsync<T>(int beatId, string userId, string content, int? parentId = null)
        {
            var comment = new BeatComment
            {
                Content = content,
                ParentId = parentId,
                BeatId = beatId,
                UserId = userId,
            };

            await this.beatCommentsRepository.AddAsync(comment);
            await this.beatCommentsRepository.SaveChangesAsync();

            return await this.beatCommentsRepository
                .All()
                .Where(x => x.Content == content && x.BeatId == beatId && x.UserId == userId)
                .To<T>()
                .FirstOrDefaultAsync();
        }

        public async Task<bool> IsInPostId(int commentId, int beatId)
        {
            var commentBeatId = await this.beatCommentsRepository.All().Where(x => x.Id == commentId)
                .Select(x => x.BeatId).FirstOrDefaultAsync();
            return commentBeatId == beatId;
        }
    }
}
