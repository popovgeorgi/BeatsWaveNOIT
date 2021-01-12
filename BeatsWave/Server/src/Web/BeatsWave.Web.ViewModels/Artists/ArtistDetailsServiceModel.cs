namespace BeatsWave.Web.Models.Artists
{
    using System.Collections.Generic;

    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistDetailsServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string ProfileFirstName { get; set; }

        public string ProfileLastName { get; set; }

        public string ProfileMainPhotoUrl { get; set; }

        public int FollowersCount { get; set; }

        public string ProfileBiography { get; set; }

        public virtual ICollection<ArtistBeatResponseModel> Beats { get; set; }
    }
}
