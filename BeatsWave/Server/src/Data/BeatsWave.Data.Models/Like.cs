namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    public class Like : BaseDeletableModel<int>
    {
        [Required]
        public int BeatId { get; set; }

        public virtual Beat Beat { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
