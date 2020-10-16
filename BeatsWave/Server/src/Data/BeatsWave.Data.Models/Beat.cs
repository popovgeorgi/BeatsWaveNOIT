namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    using static Validation.Beat;

    public class Beat : BaseDeletableModel<int>
    {
        [Required]
        [MaxLength(MaxNameLength)]
        public string Name { get; set; }

        [Required]
        public string BeatUrl { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public int Price { get; set; }

        [Required]
        public Genre Genre { get; set; }

        public int? Bpm { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        [Required]
        public string ProducerId { get; set; }

        public ApplicationUser Producer { get; set; }
    }
}
