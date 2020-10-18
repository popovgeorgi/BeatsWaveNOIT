namespace BeatsWave.Web.Models.Beats
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatListingServiceModel : IMapFrom<Beat>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string BeatUrl { get; set; }

        public string ProducerUserName { get; set; }
    }
}
