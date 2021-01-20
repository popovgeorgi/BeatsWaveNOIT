namespace BeatsWave.Web.Models.Beats
{
    using System.ComponentModel.DataAnnotations;

    using static BeatsWave.Data.Models.Validation.Beat;

    public class UpdateBeatRequestModel
    {
        [MaxLength(MaxNameLength)]
        public string Name { get; set; }

        public int? Price { get; set; }

        public string Genre { get; set; }

        public int? Bpm { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
