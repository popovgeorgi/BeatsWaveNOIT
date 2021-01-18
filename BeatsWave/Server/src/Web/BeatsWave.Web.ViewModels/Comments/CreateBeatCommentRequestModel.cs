namespace BeatsWave.Web.Models.Comments
{
    public class CreateBeatCommentRequestModel
    {
        public int BeatId { get; set; }

        public int ParentId { get; set; }

        public string Content { get; set; }
    }
}
