namespace BeatsWave.Web.Models.Comments
{
    using System.Collections.Generic;

    public class ArtistCommentsServiceModel
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public virtual IEnumerable<ArtistCommentChildrenResponseModel> Children { get; set; }
    }
}
