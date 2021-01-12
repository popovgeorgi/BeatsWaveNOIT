namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.Search;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class SearchController : ApiController
    {
        private readonly ISearchService searchService;

        public SearchController(ISearchService searchService)
        {
            this.searchService = searchService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<SearchResponseModel> SearchByTerm(string term)
        {
            var artists = await this.searchService.GetArtistsByTermAsync(term);
            var beats = await this.searchService.GetBeatsByTermAsync(term);

            return new SearchResponseModel
            {
                Beats = beats,
                Artists = artists,
            };
        }
    }
}
