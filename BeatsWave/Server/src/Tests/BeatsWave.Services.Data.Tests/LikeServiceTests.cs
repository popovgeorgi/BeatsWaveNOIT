namespace BeatsWave.Services.Data.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using Moq;
    using Xunit;

    public class LikeServiceTests
    {
        [Fact]
        public void WhenUserLikes2TimesHisLikeIsNotCounted()
        {
            var likes = new List<Like>();
            var beatRepo = new Mock<IDeletableEntityRepository<Beat>>();
            var likeRepo = new Mock<IDeletableEntityRepository<Like>>();
            likeRepo.Setup(r => r.AddAsync(It.IsAny<Like>())).Callback(
                (Like like) => likes.Add(like));
            likeRepo.Setup(r => r.Delete(It.IsAny<Like>())).Callback(
                (Like like) => likes.Remove(like));
            likeRepo.Setup(r => r.All()).Returns(likes.AsQueryable());
            var likeService = new LikeService(likeRepo.Object, beatRepo.Object);

            likeService.VoteAsync(1, "1").GetAwaiter();
            likeService.VoteAsync(1, "1").GetAwaiter();

            Assert.Empty(likes);
        }
    }
}
