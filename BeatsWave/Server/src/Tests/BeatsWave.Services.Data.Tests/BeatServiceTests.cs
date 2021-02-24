namespace BeatsWave.Services.Data.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data;
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Data.Repositories;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using Xunit;

    public class BeatServiceTests
    {
        [Theory]
        [InlineData(30, 20)]
        [InlineData(50, 20)]
        [InlineData(20)]
        [InlineData(100, 0)]

        public async Task CheckIfAllMethodReturnsTheCorrectAmountOfData(int? take = null, int skip = 0)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>()
               .UseInMemoryDatabase(Guid.NewGuid().ToString());
            var dbContext = new ApplicationDbContext(optionsBuilder.Options);
            var beatRepo = new EfDeletableEntityRepository<Beat>(dbContext);
            var playRepo = new EfRepository<Play>(dbContext);
            var beatService = new BeatService(beatRepo, playRepo);

            for (int i = 1; i <= 100; i++)
            {
                var year = 2020;

                await beatRepo.AddAsync(new Beat
                {
                    Id = i,
                    CreatedOn = DateTime.Parse($"13/02/{year++} 15:43:56"),
                });
            }
            await beatRepo.SaveChangesAsync();
            AutoMapperConfig.RegisterMappings(typeof(FakeBeatModel).Assembly);
            var result = await beatService.AllAsync<FakeBeatModel>(take, skip);
            dbContext.Database.EnsureDeleted();
            result.OrderBy(x => x.Id);

            Assert.Equal(take, result.ToList().Count);
            Assert.Equal(skip + 1, result.First().Id);
        }

        [Fact]
        public void CheckIfAddPlayMethodDoesNotAddPlayToTheSameUserThatRequested()
        {
            var plays = new List<Play>();
            var beats = new List<Beat>();
            var beatRepo = new Mock<IDeletableEntityRepository<Beat>>();
            beatRepo.Setup(b => b.AddAsync(It.IsAny<Beat>())).Callback(
                (Beat beat) => beats.Add(beat));
            beatRepo.Setup(b => b.All()).Returns(beats.AsQueryable());
            var playRepo = new Mock<IRepository<Play>>();
            playRepo.Setup(p => p.AddAsync(It.IsAny<Play>())).Callback(
                (Play play) => plays.Add(play));
            playRepo.Setup(r => r.All()).Returns(plays.AsQueryable());
            var beatService = new BeatService(beatRepo.Object, playRepo.Object);

            beatService.CreateAsync("test", "test", "test", 10, Genre.Rock.ToString(), 112, "test", "user").GetAwaiter();
            beatService.AddPlay(0, "user").GetAwaiter();

            Assert.Empty(plays);
        }

        [Fact]
        public void CheckIfUserCannotEditOtherUserBeat()
        {
            var plays = new List<Play>();
            var beats = new List<Beat>();
            var beatRepo = new Mock<IDeletableEntityRepository<Beat>>();
            beatRepo.Setup(b => b.AddAsync(It.IsAny<Beat>())).Callback(
                (Beat beat) => beats.Add(beat));
            beatRepo.Setup(b => b.All()).Returns(beats.AsQueryable());
            var playRepo = new Mock<IRepository<Play>>();
            var beatService = new BeatService(beatRepo.Object, playRepo.Object);

            beatService.CreateAsync("test", "test", "test", 10, Genre.Rock.ToString(), 112, "test", "user").GetAwaiter();
            beatService.UpdateAsync("anotherUser", 0, "hack", 100, Genre.HipHop.ToString(), 120, "hack").GetAwaiter();

            Assert.Equal("test", beats.First().Name);
        }

        [Fact]

        public void CheckIfUserCannotDeleteOtherUserBeat()
        {
            var plays = new List<Play>();
            var beats = new List<Beat>();
            var beatRepo = new Mock<IDeletableEntityRepository<Beat>>();
            beatRepo.Setup(b => b.AddAsync(It.IsAny<Beat>())).Callback(
                (Beat beat) => beats.Add(beat));
            beatRepo.Setup(b => b.All()).Returns(beats.AsQueryable());
            var playRepo = new Mock<IRepository<Play>>();
            var beatService = new BeatService(beatRepo.Object, playRepo.Object);

            beatService.CreateAsync("test", "test", "test", 10, Genre.Rock.ToString(), 112, "test", "user").GetAwaiter();
            beatService.DeleteAsync("hacker", 0).GetAwaiter();

            Assert.Single(beats);
        }

        public class FakeBeatModel : IMapFrom<Beat>
        {
            public int Id { get; set; }
        }
    }
}
