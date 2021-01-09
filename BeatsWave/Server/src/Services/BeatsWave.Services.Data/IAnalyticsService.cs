namespace BeatsWave.Services.Data
{
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Analytics;

    public interface IAnalyticsService
    {
        Task<UsersAnalyticsResponseModel> GetUserCountByMonthInfo();

        Task<BeatsAnalyticsResponseModel> GetBeatCountByMonthInfo();

        Task<PurchasesAnalyticsResponseModel> GetPurchasesByMonthInfo();
    }
}
