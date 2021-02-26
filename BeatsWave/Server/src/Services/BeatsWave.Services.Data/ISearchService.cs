namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Search;

    public interface ISearchService
    {
        Task<IEnumerable<BeatsSearchServiceModel>> GetBeatsByTermAsync(string term);

        Task<IEnumerable<ArtistsSearchServiceModel>> GetArtistsByTermAsync(string term, IEnumerable<string> artistsIds);
    }
}
