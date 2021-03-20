namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Beats;

    public interface IRecommendService
    {
        int[] RecommendToUser(string userId, IEnumerable<BeatRecommendServiceModel> beats);
    }
}
