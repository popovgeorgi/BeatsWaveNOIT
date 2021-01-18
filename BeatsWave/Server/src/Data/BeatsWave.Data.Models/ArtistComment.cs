namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    using static Validation.ArtistComment;

    public class ArtistComment : BaseDeletableModel<int>
    {
        [Required]
        public string ArtistId { get; set; }

        public virtual ApplicationUser Artist { get; set; }

        public int? ParentId { get; set; }

        public virtual ArtistComment Parent { get; set; }

        [Required]
        [MaxLength(MaxContentLength)]

        public string Content { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
