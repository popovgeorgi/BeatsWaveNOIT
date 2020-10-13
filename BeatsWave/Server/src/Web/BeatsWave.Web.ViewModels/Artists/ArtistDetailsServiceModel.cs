namespace BeatsWave.Web.Models.Artists
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistDetailsServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string ProfileFirstName { get; set; }

        public string ProfileLastName { get; set; }

        public string ProfileMainPhotoUrl { get; set; }
    }
}
