namespace BeatsWave.Web.Models.Comments
{
    using AutoMapper;
    using BeatsWave.Data.Models;

    public class BeatCommentChildrenResponseModel
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }
    }
}
