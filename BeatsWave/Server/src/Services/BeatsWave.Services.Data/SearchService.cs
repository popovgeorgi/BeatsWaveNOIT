﻿namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Models.Search;
    using Microsoft.EntityFrameworkCore;

    public class SearchService : ISearchService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Beat> beatRepository;

        public SearchService(IDeletableEntityRepository<ApplicationUser> userRepository, IDeletableEntityRepository<Beat> beatRepository)
        {
            this.userRepository = userRepository;
            this.beatRepository = beatRepository;
        }

        public async Task<IEnumerable<ArtistsSearchServiceModel>> GetArtistsByTermAsync(string term)
        {
            return await this.userRepository
                .All()
                .Where(x => x.UserName.ToLower().Contains(term.ToLower()))
                .Take(3)
                .To<ArtistsSearchServiceModel>()
                .ToListAsync();
        }

        public async Task<IEnumerable<BeatsSearchServiceModel>> GetBeatsByTermAsync(string term)
        {
            return await this.beatRepository
                .All()
                .Where(b => b.Name.ToLower().Contains(term.ToLower()))
                .Take(3)
                .To<BeatsSearchServiceModel>()
                .ToListAsync();
        }
    }
}
