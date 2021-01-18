namespace BeatsWave.Web.Models.Comments
{
    public class CreateArtistCommentRequestModel
    {
        public string ArtistId { get; set; }

        public int ParentId { get; set; }

        public string Content { get; set; }
    }
}
