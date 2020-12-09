namespace BeatsWave.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Events;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class EventsController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly IEventService eventService;

        public EventsController(ICurrentUserService currentUser, IEventService eventService)
        {
            this.currentUser = currentUser;
            this.eventService = eventService;
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Create(CreateEventRequestModel model)
        {
            var managerId = this.currentUser.GetId();

            var id = await this.eventService.CreateAsync(
                model.Name,
                model.ImageUrl,
                model.Venue,
                model.PhoneNumber,
                model.Email,
                model.ConductDate,
                model.Description,
                model.Price,
                managerId);

            return this.Created(nameof(this.Create), id);
        }

        [HttpGet]
        [AllowAnonymous]

        public async Task<IEnumerable<EventListingServiceModel>> All()
            => await this.eventService.AllAsync<EventListingServiceModel>();
    }
}
