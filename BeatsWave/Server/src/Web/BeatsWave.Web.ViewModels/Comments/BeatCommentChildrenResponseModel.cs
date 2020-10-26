namespace BeatsWave.Web.Models.Comments
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatCommentChildrenResponseModel : IMapFrom<BeatComment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<BeatComment, BeatCommentChildrenResponseModel>()
                .ForMember(c => c.ImageUrl, m => m.MapFrom(b => b.User.Profile.MainPhotoUrl));
        }
    }
}
