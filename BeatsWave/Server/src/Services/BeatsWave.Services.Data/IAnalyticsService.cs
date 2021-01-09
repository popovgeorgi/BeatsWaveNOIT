namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BeatsWave.Web.Models.Analytics;

    public interface IAnalyticsService
    {
        Task<IEnumerable<UsersCountByMonthServiceModel>> GetUserCountByMonthInfo();

        Task<IEnumerable<BeatsCountByMonthServiceModel>> GetBeatCountByMonthInfo();

        Task<IEnumerable<PurchasesByMonthServiceModel>> GetPurchasesByMonthInfo();
    }
}
