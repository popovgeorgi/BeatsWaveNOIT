namespace BeatsWave.Web.Models.Users
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class UserFavouritesServiceModel : IMapFrom<Like>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string ProducerUserName { get; set; }

        public int LikesCount { get; set; }

        public int CommentsCount { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<Like, UserFavouritesServiceModel>()
                .ForMember(b => b.Id, m => m.MapFrom(l => l.Beat.Id))
                .ForMember(b => b.Url, m => m.MapFrom(l => l.Beat.BeatUrl))
                .ForMember(b => b.Name, m => m.MapFrom(l => l.Beat.Name))
                .ForMember(b => b.ImageUrl, m => m.MapFrom(l => l.Beat.ImageUrl))
                .ForMember(b => b.ProducerUserName, m => m.MapFrom(l => l.User.UserName))
                .ForMember(b => b.LikesCount, m => m.MapFrom(l => l.Beat.Likes.Count))
                .ForMember(b => b.CommentsCount, m => m.MapFrom(l => l.Beat.Comments.Count));
        }
    }
}
