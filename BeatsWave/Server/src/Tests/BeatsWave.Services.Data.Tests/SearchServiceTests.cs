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
    using BeatsWave.Web.Models.Search;
    using Microsoft.EntityFrameworkCore;
    using Xunit;

    public class SearchServiceTests
    {
        [Theory]
        [InlineData("EdGyTeStCase")]
        [InlineData("234user")]
        [InlineData("Redddddddddddddddddd")]
        public async Task CheckIfArtistsGetCorrectlyReturnedAsync(string searchValue)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>()
               .UseInMemoryDatabase(Guid.NewGuid().ToString());
            var dbContext = new ApplicationDbContext(optionsBuilder.Options);
            var beatRepo = new EfDeletableEntityRepository<Beat>(dbContext);
            var userRepo = new EfDeletableEntityRepository<ApplicationUser>(dbContext);
            var searchService = new SearchService(userRepo, beatRepo);

            await userRepo.AddAsync(new ApplicationUser
            {
                Id = "user",
                UserName = searchValue,
            });
            for (int i = 1; i <= 100; i++)
            {
                await userRepo.AddAsync(new ApplicationUser
                {
                    Id = "1" + i,
                    UserName = Guid.NewGuid().ToString(),
                });
            };
            await userRepo.SaveChangesAsync();
            AutoMapperConfig.RegisterMappings(typeof(ArtistsSearchServiceModel).Assembly);
            var result = await searchService.GetArtistsByTermAsync(searchValue);
            dbContext.Database.EnsureDeleted();

            Assert.True(result.FirstOrDefault(x => x.UserName == searchValue).Id == "user");
        }

        public class FakeArtistModel : IMapFrom<ApplicationUser>
        {
            public string Id { get; set; }

            public string UserName { get; set; }
        }

        private List<ApplicationUser> GetInitialArtistsData()
        {
            var artists = new List<ApplicationUser>();

            for (int i = 1; i <= 100; i++)
            {
                var artist = new ApplicationUser
                {
                    Id = "1" + i,
                    UserName = Guid.NewGuid().ToString(),
                };

                artists.Add(artist);
            }

            return artists;
        }
    }
}
