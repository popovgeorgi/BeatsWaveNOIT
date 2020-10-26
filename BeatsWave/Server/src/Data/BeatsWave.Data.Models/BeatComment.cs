namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    using static Validation.BeatComment;

    public class BeatComment : BaseDeletableModel<int>
    {
        public int BeatId { get; set; }

        public virtual Beat Beat { get; set; }

        public int? ParentId { get; set; }

        public virtual BeatComment Parent { get; set; }

        [Required]
        [MaxLength(MaxContentLength)]
        public string Content { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
