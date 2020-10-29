namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    using static Validation.Event;

    public class Event : BaseDeletableModel<int>
    {
        [Required]
        [MaxLength(MaxNameLength)]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        [MaxLength(MaxVenueLength)]
        public string Venue { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public decimal? Price { get; set; }

        public virtual ApplicationUser Manager { get; set; }

        [Required]
        public string ManagerId { get; set; }
    }
}
