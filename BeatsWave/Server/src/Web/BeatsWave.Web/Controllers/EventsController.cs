namespace BeatsWave.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class EventsController : ApiController
    {
        //[HttpPost]
        //[Authorize(Roles = "Manager")]
        //public async Task<IActionResult> Create(CreateEventRequestModel model)
        //{
        //    var producerId = this.currentUser.GetId();

        //    var id = await this.beatService.CreateAsync(
        //        model.Name,
        //        model.BeatUrl,
        //        model.ImageUrl,
        //        model.Price,
        //        model.Genre,
        //        model.Bpm,
        //        model.Description,
        //        producerId);

        //    return this.Created(nameof(this.Create), id);
        //}
    }
}
