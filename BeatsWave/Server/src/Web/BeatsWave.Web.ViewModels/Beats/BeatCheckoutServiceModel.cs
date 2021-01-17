namespace BeatsWave.Web.Models.Beats
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatCheckoutServiceModel : IMapFrom<Beat>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public int Price { get; set; }

        public string ProducerUserName { get; set; }

        public int LikesCount { get; set; }

        public int CommentsCount { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<Beat, BeatListingServiceModel>()
                .ForMember(b => b.Url, m => m.MapFrom(b => b.BeatUrl));
        }
    }
}
