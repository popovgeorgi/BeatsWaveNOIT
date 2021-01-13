namespace BeatsWave.Web.Models.Search
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatsSearchServiceModel : IMapFrom<Beat>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }
    }
}
