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
        private readonly IDeletableEntityRepository<ArtistComment> artistCommentsRepository;

        public CommentService(IDeletableEntityRepository<BeatComment> beatCommentsRepository, IDeletableEntityRepository<ArtistComment> artistCommentsRepository)
        {
            this.beatCommentsRepository = beatCommentsRepository;
            this.artistCommentsRepository = artistCommentsRepository;
        }

        public async Task<IEnumerable<ArtistCommentsServiceModel>> CommentsForArtist(string artistId)
        {
            return await this.artistCommentsRepository
                .All()
                .Where(a => a.ArtistId == artistId && a.ParentId == null)
                .Select(x => new ArtistCommentsServiceModel
                {
                    UserUserName = x.User.UserName,
                    UserId = x.UserId,
                    ImageUrl = x.User.Profile.MainPhotoUrl,
                    Content = x.Content,
                    Id = x.Id,
                    Children = this.beatCommentsRepository.All()
                        .Where(c => c.ParentId == x.Id)
                        .Select(c => new ArtistCommentChildrenResponseModel
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

        public async Task<T> CreateArtistCommentAsync<T>(string artistId, string userId, string content, int? parentId = null)
        {
            var comment = new ArtistComment
            {
                Content = content,
                ParentId = parentId,
                ArtistId = artistId,
                UserId = userId,
            };

            await this.artistCommentsRepository.AddAsync(comment);
            await this.artistCommentsRepository.SaveChangesAsync();

            return await this.artistCommentsRepository
                .All()
                .Where(x => x.Content == content && x.ArtistId == artistId && x.UserId == userId)
                .To<T>()
                .FirstOrDefaultAsync();
        }

        public async Task<T> CreateBeatCommentAsync<T>(int beatId, string userId, string content, int? parentId = null)
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

        public async Task<bool> IsInArtistPostId(int commentId, string artistId)
        {
            var commentArtistId = await this.artistCommentsRepository.All().Where(x => x.Id == commentId)
                .Select(x => x.ArtistId).FirstOrDefaultAsync();
            return commentArtistId == artistId;
        }

        public async Task<bool> IsInBeatPostId(int commentId, int beatId)
        {
            var commentBeatId = await this.beatCommentsRepository.All().Where(x => x.Id == commentId)
                .Select(x => x.BeatId).FirstOrDefaultAsync();
            return commentBeatId == beatId;
        }
    }
}
