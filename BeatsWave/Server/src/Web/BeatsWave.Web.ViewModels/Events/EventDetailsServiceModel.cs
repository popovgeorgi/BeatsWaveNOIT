namespace BeatsWave.Web.Models.Events
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class EventDetailsServiceModel : IMapFrom<Event>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Venue { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public DateTime ConductDate { get; set; }

        public string Description { get; set; }

        public decimal? Price { get; set; }
    }
}
