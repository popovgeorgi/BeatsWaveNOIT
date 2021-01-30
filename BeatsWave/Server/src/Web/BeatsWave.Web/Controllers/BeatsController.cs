namespace BeatsWave.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Hubs;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Beats;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Caching.Distributed;
    using Newtonsoft.Json;

    using static BeatsWave.Common.GlobalConstants;

    public class BeatsController : ApiController
    {
        private readonly IBeatService beatService;
        private readonly ICurrentUserService currentUser;
        private readonly IHubContext<FeedHub> feedHub;
        private readonly IDistributedCache cacheService;

        public BeatsController(IBeatService beatService, ICurrentUserService currentUser, IHubContext<FeedHub> feedHub, IDistributedCache cacheService)
        {
            this.beatService = beatService;
            this.currentUser = currentUser;
            this.feedHub = feedHub;
            this.cacheService = cacheService;
        }

        [HttpPost]
        [Authorize(Roles = "Beatmaker, Administrator")]
        public async Task<IActionResult> Create(CreateBeatRequestModel model)
        {
            var producerId = this.currentUser.GetId();

            var id = await this.beatService.CreateAsync(
                model.Name,
                model.BeatUrl,
                model.ImageUrl,
                model.Price,
                model.Genre,
                model.Bpm,
                model.Description,
                producerId);

            await this.feedHub.Clients.All.SendAsync("NewBeatReceived", id);

            return this.Created(nameof(this.Create), id);
        }

        [HttpPut]
        public async Task<ActionResult> Update(int beatId, [FromBody]UpdateBeatRequestModel model)
        {
            var producerId = this.currentUser.GetId();

            var result = await this.beatService.UpdateAsync(
                producerId,
                beatId,
                model.Name,
                model.Price,
                model.Genre,
                model.Bpm,
                model.Description);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int beatId)
        {
            var producerId = this.currentUser.GetId();

            var result = await this.beatService.DeleteAsync(producerId, beatId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<BeatListingServiceModel>> All(int take, int skip)
            => await this.beatService.AllAsync<BeatListingServiceModel>(take, skip);

        [HttpGet]
        [Route(Id)]
        [AllowAnonymous]
        public async Task<BeatDetailsServiceModel> Details(int id)
            => await this.beatService.DetailsAsync<BeatDetailsServiceModel>(id);

        [HttpGet]
        [Route(nameof(Mine))]
        public async Task<IEnumerable<BeatListingServiceModel>> Mine()
            => await this.beatService.ByUser<BeatListingServiceModel>(this.currentUser.GetId());

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(MostlyLiked))]
        public async Task<IEnumerable<BeatListingServiceModel>> MostlyLiked()
        {
            var info = await this.cacheService.GetStringAsync("MostlyLikedBeats");

            IEnumerable<BeatListingServiceModel> data;

            if (info == null)
            {
                data = await this.beatService.ByLikes<BeatListingServiceModel>();

                await this.cacheService.SetStringAsync(
                    "MostlyLikedBeats",
                    JsonConvert.SerializeObject(data),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = new TimeSpan(2, 0, 0),
                    });
            }
            else
            {
                data = JsonConvert.DeserializeObject<IEnumerable<BeatListingServiceModel>>(info);
            }

            return data;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(ByGenreRoute)]
        public async Task<IEnumerable<BeatListingServiceModel>> ByGenre(string genre, int take, int skip)
            => await this.beatService.ByGenre<BeatListingServiceModel>(genre, take, skip);

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(ByIds))]

        public async Task<IEnumerable<BeatCheckoutServiceModel>> ByIds([FromQuery] int[] ids)
            => await this.beatService.ByIds<BeatCheckoutServiceModel>(ids);

        //[HttpPut]
        //[AllowAnonymous]
        //[Route(AddPlayRoute)]
        //public async Task<ActionResult> AddPlay(AddPlayRequestModel model)
        //{
        //    var userId = this.currentUser.GetId();

        //    var result = await this.beatService.AddPlay(model.BeatId, userId);
        //    if (result.Failure)
        //    {
        //        return this.BadRequest(result.Error);
        //    }

        //    return this.Ok();
        //}

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(Trending))]

        public async Task<IEnumerable<BeatListingServiceModel>> Trending()
        {
            var info = await this.cacheService.GetStringAsync("TrendingBeats");

            IEnumerable<BeatListingServiceModel> data;

            if (info == null)
            {
                data = await this.beatService.MostTrending<BeatListingServiceModel>();

                await this.cacheService.SetStringAsync(
                    "TrendingBeats",
                    JsonConvert.SerializeObject(data),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = new TimeSpan(1, 0, 0),
                    });
            }
            else
            {
                data = JsonConvert.DeserializeObject<IEnumerable<BeatListingServiceModel>>(info);
            }

            return data;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(Featured))]

        public async Task<IEnumerable<BeatListingServiceModel>> Featured()
        {
            var info = await this.cacheService.GetStringAsync("FeaturedBeats");

            IEnumerable<BeatListingServiceModel> data;

            if (info == null)
            {
                data = await this.beatService.FeaturedAsync<BeatListingServiceModel>();

                await this.cacheService.SetStringAsync(
                    "FeaturedBeats",
                    JsonConvert.SerializeObject(data),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = new TimeSpan(0, 30, 0),
                    });
            }
            else
            {
                data = JsonConvert.DeserializeObject<IEnumerable<BeatListingServiceModel>>(info);
            }

            return data;
        }
    }
}
