namespace BeatsWave.Web.Models.Beats
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatDetailsServiceModel : IMapFrom<Beat>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Url { get; set; }

        public int Price { get; set; }

        public string Genre { get; set; }

        public int? Bpm { get; set; }

        public string Description { get; set; }

        public string ProducerUserName { get; set; }

        public string ProducerEmail { get; set; }

        public string ProducerProfileMainPhotoUrl { get; set; }

        public string ProducerId { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<Beat, BeatDetailsServiceModel>()
                .ForMember(b => b.Genre, m => m.MapFrom(b => b.Genre.ToString()))
                .ForMember(b => b.Url, m => m.MapFrom(b => b.BeatUrl));
        }
    }
}
