namespace BeatsWave.Web.Models.Events
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using System;

    public class EventListingServiceModel : IMapFrom<Event>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsExpired { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<Event, EventListingServiceModel>()
                .ForMember(e => e.IsExpired, m => m.MapFrom(e => e.ConductDate < DateTime.Now));
        }
    }
}
