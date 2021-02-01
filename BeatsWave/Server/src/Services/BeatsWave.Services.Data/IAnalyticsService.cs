namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Analytics;

    public interface IAnalyticsService
    {
        Task<UsersAnalyticsResponseModel> GetUserCountByMonthInfo();

        Task<BeatsAnalyticsResponseModel> GetBeatCountByMonthInfo();

        Task<PurchasesAnalyticsResponseModel> GetPurchasesByMonthInfo();

        Task<TotalEarningsAnalyticsResponseModel> GetTotalEarnings();

        Task<DistinctUsersResponseModel> GetDistinctUsersListeningToUser(string producerId);

        Task<SongsByMonthsResponseModel> GetBeatsPerMonthOfUser(string producerId);

        Task<LikesByMonthsResponseModel> GetLikesPerMonthOfUser(string producerId);
    }
}
