namespace BeatsWave.Web.Models.Comments
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistCommentResponseModel : IMapFrom<ArtistComment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<BeatComment, BeatCommentResponseModel>()
                .ForMember(b => b.ImageUrl, m => m.MapFrom(b => b.User.Profile.MainPhotoUrl));
        }
    }
}
