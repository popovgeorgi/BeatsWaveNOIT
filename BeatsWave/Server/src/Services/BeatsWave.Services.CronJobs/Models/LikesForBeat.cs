namespace BeatsWave.Services.CronJobs.Models
{
    using Microsoft.ML.Data;

    public class LikesForBeat
    {
        [LoadColumn(0)]
        public string UserId { get; set; }

        [LoadColumn(1)]
        public int BeatId { get; set; }

        [LoadColumn(2)]
        public float Label { get; set; }
    }
}
