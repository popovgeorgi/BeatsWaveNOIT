namespace BeatsWave.Web.Models.Artists
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistListingServiceModel : IMapFrom<ApplicationUser>
    {
        public string ProfileFirstName { get; set; }

        public string ProfileLastName { get; set; }

        public string ProfileMainPhotoUrl { get; set; }
    }
}
