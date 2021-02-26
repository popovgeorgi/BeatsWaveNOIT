namespace BeatsWave.Web.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Models;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.Search;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static BeatsWave.Common.GlobalConstants;

    public class SearchController : ApiController
    {
        private readonly ISearchService searchService;
        private readonly UserManager<ApplicationUser> userManager;

        public SearchController(
            ISearchService searchService,
            UserManager<ApplicationUser> userManager)
        {
            this.searchService = searchService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route(Term)]
        [AllowAnonymous]
        public async Task<SearchResponseModel> SearchByTerm(string term)
        {
            var usersOfRoleArtists = await this.userManager.GetUsersInRoleAsync(BeatmakerRoleName);
            var userosOfRoleAdministrators = await this.userManager.GetUsersInRoleAsync(AdministratorRoleName);
            foreach (var administrator in userosOfRoleAdministrators)
            {
                usersOfRoleArtists.Add(administrator);
            }

            var artistsIds = usersOfRoleArtists.Select(a => a.Id).ToList();

            var artists = await this.searchService.GetArtistsByTermAsync(term, artistsIds);
            var beats = await this.searchService.GetBeatsByTermAsync(term);

            return new SearchResponseModel
            {
                Beats = beats,
                Artists = artists,
            };
        }
    }
}
