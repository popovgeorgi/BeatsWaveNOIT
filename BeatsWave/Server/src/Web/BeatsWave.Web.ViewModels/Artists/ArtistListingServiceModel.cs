namespace BeatsWave.Web.Models.Artists
{
    using System;

    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistListingServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public int FollowersCount { get; set; }

        public string ProfileFirstName { get; set; }

        public string ProfileLastName { get; set; }

        public string ProfileMainPhotoUrl { get; set; }
    }
}
