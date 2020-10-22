namespace BeatsWave.Web.Models.Profile
{
    using System.ComponentModel.DataAnnotations;

    using static BeatsWave.Data.Models.Validation.User;

    public class UpdateProfileRequestModel
    {
        [MaxLength(MaxNameLength)]
        public string FirstName { get; set; }

        [MaxLength(MaxNameLength)]
        public string LastName { get; set; }


        [MaxLength(MaxDisplayNameLength)]
        public string DisplayName { get; set; }

        [MaxLength(MaxLocationLength)]
        public string Location { get; set; }

        [MaxLength(MaxBiographyLength)]
        public string Biography { get; set; }
    }
}
