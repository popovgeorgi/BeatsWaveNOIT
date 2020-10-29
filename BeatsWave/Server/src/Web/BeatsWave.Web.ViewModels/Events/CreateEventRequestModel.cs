namespace BeatsWave.Web.Models.Events
{
    using System.ComponentModel.DataAnnotations;

    using static BeatsWave.Data.Models.Validation.Event;

    public class CreateEventRequestModel
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

        [Required]
        public string ConductDate { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public decimal? Price { get; set; }
    }
}
