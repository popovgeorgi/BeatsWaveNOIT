namespace BeatsWave.Web.Models.Comments
{
    public class CreateCommentRequestModel
    {
        public int BeatId { get; set; }

        public int ParentId { get; set; }

        public string Content { get; set; }
    }
}
