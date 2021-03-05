namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure.Services;
    using BeatsWave.Web.Models.Artists;
    using BeatsWave.Web.Models.Beats;
    using BeatsWave.Web.Models.Likes;
    using Microsoft.AspNetCore.Mvc;

    using static BeatsWave.Common.GlobalConstants;

    public class LikesController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly ILikeService likeService;
        private readonly INotificationService notificationService;
        private readonly IArtistService artistService;
        private readonly IBeatService beatService;

        public LikesController(
            ICurrentUserService currentUser,
            ILikeService likeService,
            INotificationService notificationService,
            IArtistService artistService,
            IBeatService beatService)
        {
            this.currentUser = currentUser;
            this.likeService = likeService;
            this.notificationService = notificationService;
            this.artistService = artistService;
            this.beatService = beatService;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Beat(LikeRequestModel model)
        {
            var isLiked = await this.likeService.VoteAsync(model.BeatId, this.currentUser.GetId());

            // User receives a notification only when his beat is liked
            if (isLiked)
            {
                var producerOflikedBeat = await this.artistService.GetProducerByBeatIdAsync<ArtistByBeatIdServiceModel>(model.BeatId);

                // If user likes his own beat, he will not receive a notification
                if (producerOflikedBeat.ProducerId != this.currentUser.GetId())
                {
                    var beat = await this.beatService.DetailsAsync<BeatNameServiceModel>(model.BeatId);
                    await this.notificationService.CreateAsync(producerOflikedBeat.ProducerId, this.currentUser.GetId(), string.Format(LikeNotification, this.currentUser.GetUserName(), beat.Name), "Like");
                }
            }

            return isLiked;
        }

        [HttpGet]
        [Route(BeatId)]
        public async Task<bool> IsALiker(int beatId)
            => await this.likeService.DoesUserLikeAsync(beatId, this.currentUser.GetId());
    }
}
