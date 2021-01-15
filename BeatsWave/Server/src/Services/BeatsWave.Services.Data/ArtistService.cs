namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

    public class ArtistService : IArtistService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public ArtistService(IDeletableEntityRepository<ApplicationUser> userRepository)
            => this.userRepository = userRepository;

        public async Task<IEnumerable<T>> AllAsync<T>(IEnumerable<string> artistsIds, int? take = null, int skip = 0)
        {
            var query = this.userRepository
                .All()
                .Where(u => artistsIds.Contains(u.Id))
                .OrderByDescending(x => x.CreatedOn)
                .Skip(skip);

            if (take != 0)
            {
                query = query.Take(take.Value);
            }

            return await query.To<T>().ToListAsync();
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

        public async Task<IEnumerable<T>> FeaturedAsync<T>()
        {
            var featuredArtists = await this.userRepository
                .All()
                .Where(x => x.Subscription == Subscription.Featured || x.Subscription == Subscription.Premium)
                .To<T>()
                .ToListAsync();

            return featuredArtists;
        }
    }
}
