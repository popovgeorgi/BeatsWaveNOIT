namespace BeatsWave.Web.Hubs
{
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Web.Models.FeedHub;
    using Microsoft.AspNetCore.SignalR;

    public class FeedHub : Hub
    {
        private readonly IBeatService beatService;

        public FeedHub(IBeatService beatService)
        {
            this.beatService = beatService;
        }

        public async Task GetUpdateForFeed(int firstBeatId)
        {
            CheckResult result;
            do
            {
                result = await this.beatService.GetUpdate(firstBeatId);
                if (result.New)
                {
                    await this.Clients.Caller.SendAsync("ReceiveFeedUpdate", result.Update);
                }
            }
            while (true);
        }
    }
}
