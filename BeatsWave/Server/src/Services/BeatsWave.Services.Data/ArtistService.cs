namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;

    using BeatsWave.Common;
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Models.Artists;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

    public class ArtistService : IArtistService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public ArtistService(IDeletableEntityRepository<ApplicationUser> userRepository)
            => this.userRepository = userRepository;

        public async Task<IEnumerable<T>> AllAsync<T>(int? take = null, int skip = 0)
        {
            var artists = await this.userRepository
                .All()
                .OrderByDescending(x => x.CreatedOn)
                .Skip(skip)
                .Take((int)take)
                .To<T>()
                .ToListAsync();

            return artists;
        }

        public async Task<T> DetailsAsync<T>(string userId)
        {
            var artist = await this.userRepository
                .All()
                .Where(x => x.Id == userId)
                .To<T>()
                .FirstOrDefaultAsync();

            return artist;
        }
    }
}
