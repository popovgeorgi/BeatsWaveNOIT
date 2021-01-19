namespace BeatsWave.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Events;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static BeatsWave.Common.GlobalConstants;

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
        [AllowAnonymous]
        [Authorize(Roles = "Manager, Administrator")]
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

        [HttpGet]
        [Route(Id)]
        [AllowAnonymous]
        public async Task<EventDetailsServiceModel> Details(int id)
            => await this.eventService.DetailsAsync<EventDetailsServiceModel>(id);

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(HomepageListed))]

        public async Task<IEnumerable<EventListingServiceModel>> HomepageListed()
            => await this.eventService.PremiumAsync<EventListingServiceModel>();
    }
}
