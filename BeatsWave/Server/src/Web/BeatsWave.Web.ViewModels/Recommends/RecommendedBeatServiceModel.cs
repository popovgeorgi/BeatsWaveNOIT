namespace BeatsWave.Web.Models.Recommends
{
    using System;

    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class RecommendedBeatServiceModel : IMapFrom<Beat>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string ProducerUserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<Beat, RecommendedBeatServiceModel>()
                .ForMember(b => b.Url, m => m.MapFrom(b => b.BeatUrl));
        }
    }
}
