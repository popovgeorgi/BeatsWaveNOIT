namespace BeatsWave.Web.Models.Comments
{
    using System.Collections.Generic;

    using AutoMapper;
    using BeatsWave.Data.Models;

    public class BeatCommentsServiceModel
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public virtual IEnumerable<BeatCommentChildrenResponseModel> Children { get; set; }
    }
}
