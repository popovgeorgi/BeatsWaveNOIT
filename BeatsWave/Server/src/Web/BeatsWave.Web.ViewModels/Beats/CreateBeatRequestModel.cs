namespace BeatsWave.Web.Models.Beats
{
    using System.ComponentModel.DataAnnotations;

    using Microsoft.AspNetCore.Http;

    using static BeatsWave.Data.Models.Validation.Beat;

    public class CreateBeatRequestModel
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
        public string Genre { get; set; }

        public int? Bpm { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
