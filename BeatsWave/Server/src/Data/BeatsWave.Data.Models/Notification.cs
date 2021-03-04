namespace BeatsWave.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using BeatsWave.Data.Common.Models;

    public class Notification : BaseModel<int>
    {
        public Notification()
        {
            this.IsSeen = false;
        }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        [Required]
        public string InitiatorId { get; set; }

        public virtual ApplicationUser Initiator { get; set; }

        [Required]
        public string Message { get; set; }

        public bool IsSeen { get; set; }

        [Required]
        public NotificationType Type { get; set; }
    }
}
