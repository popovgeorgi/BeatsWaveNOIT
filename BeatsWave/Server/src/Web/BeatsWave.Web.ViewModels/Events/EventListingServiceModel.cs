namespace BeatsWave.Web.Models.Events
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class EventListingServiceModel : IMapFrom<Event>
    {
        public int Id { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
