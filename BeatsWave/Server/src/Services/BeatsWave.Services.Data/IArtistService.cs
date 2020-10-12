namespace BeatsWave.Services.Data
{
    using BeatsWave.Web.Models.Artists;
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IArtistService
    {
        Task<IEnumerable<ArtistListingServiceModel>> All(int? count = null);
    }
}
