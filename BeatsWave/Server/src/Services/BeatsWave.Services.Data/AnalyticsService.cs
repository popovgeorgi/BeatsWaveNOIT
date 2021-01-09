﻿namespace BeatsWave.Services.Data
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Web.Models.Analytics;
    using Microsoft.EntityFrameworkCore;

    public class AnalyticsService : IAnalyticsService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Beat> beatRepository;

        public AnalyticsService(IDeletableEntityRepository<ApplicationUser> userRepository, IDeletableEntityRepository<Beat> beatRepository)
        {
            this.userRepository = userRepository;
            this.beatRepository = beatRepository;
        }

        public async Task<BeatsAnalyticsResponseModel> GetBeatCountByMonthInfo()
        {
            var beatsByMonth = await this.beatRepository
                .All()
                .Where(b => b.CreatedOn.Year == DateTime.Now.Year)
                .GroupBy(x => new { x.CreatedOn.Month })
                .Select(u => new BeatsCountByMonthServiceModel
                {
                    Month = u.Key.Month.ToString(),
                    BeatsCount = u.Count(),
                })
                .ToListAsync();

            var beatOutput = new int[12];
            var totalBeatCount = 0;

            foreach (var purchase in beatsByMonth)
            {
                int month = int.Parse(purchase.Month) - 1;
                beatOutput[month] = purchase.BeatsCount;
                totalBeatCount += purchase.BeatsCount;
            }

            return new BeatsAnalyticsResponseModel
            {
                BeatsPerMonth = beatOutput,
                TotalCount = totalBeatCount,
            };
        }

        public async Task<PurchasesAnalyticsResponseModel> GetPurchasesByMonthInfo()
        {
            var purchasesByMonth = await this.beatRepository
                .All()
                .Where(b => b.IsSold == true && b.ModifiedOn.Value.Year == DateTime.Now.Year)
                .GroupBy(x => new { x.CreatedOn.Month })
                .Select(p => new PurchasesByMonthServiceModel
                {
                    Month = p.Key.Month.ToString(),
                    Purchases = p.Count(),
                })
                .ToListAsync();

            var purchaseOutput = new int[12];
            var totalPurchaseCount = 0;

            foreach (var purchase in purchasesByMonth)
            {
                int month = int.Parse(purchase.Month) - 1;
                purchaseOutput[month] = purchase.Purchases;
                totalPurchaseCount += purchase.Purchases;
            }

            return new PurchasesAnalyticsResponseModel
            {
                PurchasesPerMonth = purchaseOutput,
                TotalPurchases = totalPurchaseCount,
            };
        }

        public async Task<UsersAnalyticsResponseModel> GetUserCountByMonthInfo()
        {
            var usersByMonth = await this.userRepository
                .All()
                .Where(u => u.CreatedOn.Year == DateTime.Now.Year)
                .GroupBy(x => new { x.CreatedOn.Month })
                .Select(u => new UsersCountByMonthServiceModel
                {
                    Month = u.Key.Month.ToString(),
                    UsersCount = u.Count(),
                })
                .ToListAsync();

            var userOutput = new int[12];
            var totalUserCount = 0;

            foreach (var purchase in usersByMonth)
            {
                int month = int.Parse(purchase.Month) - 1;
                userOutput[month] = purchase.UsersCount;
                totalUserCount += purchase.UsersCount;
            }

            return new UsersAnalyticsResponseModel
            {
                UsersPerMonth = userOutput,
                TotalCount = totalUserCount,
            };
        }
    }
}
