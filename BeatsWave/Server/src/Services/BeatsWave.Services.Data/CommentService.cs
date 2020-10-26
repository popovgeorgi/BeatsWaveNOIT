namespace BeatsWave.Services.Data
{
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class CommentService : ICommentService
    {
        private readonly IDeletableEntityRepository<BeatComment> beatCommentsRepository;

        public CommentService(IDeletableEntityRepository<BeatComment> beatCommentsRepository)
        {
            this.beatCommentsRepository = beatCommentsRepository;
        }

        public async Task Create(int beatId, string userId, string content, int? parentId = null)
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
        }

        public async Task<bool> IsInBeatId(int commentId, int beatId)
        {
            var commentPostId = await this.beatCommentsRepository.All().Where(x => x.Id == commentId)
                .Select(x => x.BeatId).FirstOrDefaultAsync();
            return commentPostId == beatId;
        }
    }
}
