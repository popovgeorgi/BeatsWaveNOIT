namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Common;
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Models.Artists;
    using Microsoft.EntityFrameworkCore;

    public class ArtistService : IArtistService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public ArtistService(IDeletableEntityRepository<ApplicationUser> userRepository)
            => this.userRepository = userRepository;

        public async Task<IEnumerable<ArtistListingServiceModel>> All(int? count = null)
        {
            var artists = await this.userRepository.All()
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new ArtistListingServiceModel
                {
                    ProfileFirstName = x.Profile.FirstName,
                    ProfileLastName = x.Profile.LastName,
                    ProfileMainPhotoUrl = x.Profile.MainPhotoUrl,
                })
                .ToListAsync();

            return artists;
        }
    }
}
