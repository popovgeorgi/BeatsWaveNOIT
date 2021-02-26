namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Models.Search;
    using Microsoft.EntityFrameworkCore;

    using static BeatsWave.Common.GlobalConstants;

    public class SearchService : ISearchService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Beat> beatRepository;

        public SearchService(IDeletableEntityRepository<ApplicationUser> userRepository, IDeletableEntityRepository<Beat> beatRepository)
        {
            this.userRepository = userRepository;
            this.beatRepository = beatRepository;
        }

        public async Task<IEnumerable<ArtistsSearchServiceModel>> GetArtistsByTermAsync(string term, IEnumerable<string> artistsIds)
        {
            return await this.userRepository
                .All()
                .Where(x => artistsIds.Contains(x.Id) && x.UserName.ToLower().Contains(term.ToLower()))
                .Take(TakeArtistsBySearch)
                .To<ArtistsSearchServiceModel>()
                .ToListAsync();
        }

        public async Task<IEnumerable<BeatsSearchServiceModel>> GetBeatsByTermAsync(string term)
        {
            return await this.beatRepository
                .All()
                .Where(b => b.Name.ToLower().Contains(term.ToLower()))
                .Take(TakeBeatsBySearch)
                .To<BeatsSearchServiceModel>()
                .ToListAsync();
        }
    }
}
