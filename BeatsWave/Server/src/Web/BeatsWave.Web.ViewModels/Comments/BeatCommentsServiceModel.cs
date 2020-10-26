namespace BeatsWave.Web.Models.Comments
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    using System;
    using System.Collections.Generic;
    using System.Text;

    public class BeatCommentsServiceModel : IMapFrom<BeatComment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public virtual IEnumerable<BeatCommentChildrenResponseModel> Children { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<BeatComment, BeatCommentsServiceModel>()
                .ForMember(c => c.ImageUrl, m => m.MapFrom(b => b.User.Profile.MainPhotoUrl))
                .ForMember(c => c.Children, m => m.MapFrom(b => b.ParentId == this.Id && b.ParentId.HasValue));
        }
    }
}
