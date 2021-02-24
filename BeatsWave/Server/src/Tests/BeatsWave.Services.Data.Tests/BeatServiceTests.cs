namespace BeatsWave.Services.Data.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data;
    using BeatsWave.Data.Models;
    using BeatsWave.Data.Repositories;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;
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
            dbContext.Database.EnsureDeleted();
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
            result.OrderBy(x => x.Id);

            Assert.Equal(take, result.ToList().Count);
            Assert.Equal(skip + 1, result.First().Id);
        }

        public class FakeBeatModel : IMapFrom<Beat>
        {
            public int Id { get; set; }
        }
    }
}
