namespace BeatsWave.Web.Models.Search
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistsSearchServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string ProfileMainPhotoUrl { get; set; }
    }
}
