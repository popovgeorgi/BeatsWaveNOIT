namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    public class Follow : BaseModel<int>
    {
        [Required]
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        [Required]
        public string FollowerId { get; set; }

        public ApplicationUser Follower { get; set; }
    }
}
