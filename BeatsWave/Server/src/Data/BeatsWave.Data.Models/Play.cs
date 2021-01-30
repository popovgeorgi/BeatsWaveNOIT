namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    public class Play : BaseModel<int>
    {
        [Required]
        public string PlayerId { get; set; }

        public virtual ApplicationUser Player { get; set; }

        [Required]
        public int BeatId { get; set; }

        public virtual Beat Beat { get; set; }
    }
}
