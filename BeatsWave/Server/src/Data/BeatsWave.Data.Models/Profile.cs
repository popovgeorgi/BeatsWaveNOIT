namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using BeatsWave.Data.Common.Models;

    using static Validation.User;

    public class Profile : BaseModel<int>
    {
        public Profile()
        {
            this.DisplayName = this.User.UserName;
        }

        [Required]
        public string UserId { get; set; }

        [NotMapped]
        public ApplicationUser User { get; set; }

        [MaxLength(MaxNameLength)]
        public string FirstName { get; set; }

        [MaxLength(MaxNameLength)]
        public string LastName { get; set; }

        public string MainPhotoUrl { get; set; }

        [Required]
        [MaxLength(MaxDisplayNameLength)]
        public string DisplayName { get; set; }

        [MaxLength(MaxLocationLength)]
        public string Location { get; set; }

        [MaxLength(MaxBiographyLength)]
        public string Biography { get; set; }
    }
}
