namespace BeatsWave.Web.Models.Beats
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatRecommendServiceModel : IMapFrom<Beat>
    {
        public int Id { get; set; }

        public string ProducerId { get; set; }
    }
}
