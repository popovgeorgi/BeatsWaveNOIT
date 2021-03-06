﻿namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    using BeatsWave.Common;
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json;

    public class UserService : IUserService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Like> likeRepository;

        public UserService(IDeletableEntityRepository<ApplicationUser> userRepository, IDeletableEntityRepository<Like> likeRepository)
        {
            this.userRepository = userRepository;
            this.likeRepository = likeRepository;
        }

        public async Task<bool> CheckIfUserEmailExists(string email)
            => await this.userRepository
                .All()
                .AnyAsync(u => u.Email == email);

        public async Task<string[]> GetAllEmailsAsync()
            => await this.userRepository
                .All()
                .Select(u => u.Email.ToLower())
                .ToArrayAsync();

        public async Task<bool> GetEmailNotificationsBehaviourAsync(string userId)
            => await this.userRepository
                .All()
                .Include(u => u.Profile)
                .Where(u => u.Id == userId)
                .Select(u => u.Profile.IsReceivingEmails)
                .FirstOrDefaultAsync();

        public async Task<T> GetInfo<T>(string id)
            => await this.userRepository
                .All()
                .Where(u => u.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

        public async Task<IEnumerable<T>> GetLikedBeatsAsync<T>(string userId)
        {
            return await this.likeRepository
               .All()
               .Where(x => x.UserId == userId)
               .Include(l => l.Beat)
               .To<T>()
               .ToListAsync();
        }

        public async Task<int[]> GetLikedBeatsByIdsAsync(string userId)
        {
            return await this.likeRepository
                .All()
                .Where(l => l.UserId == userId)
                .Select(l => l.BeatId)
                .ToArrayAsync();
        }

        public async Task<T> GetUserByEmailAsync<T>(string email)
            => await this.userRepository
                .All()
                .Where(u => u.Email == email)
                .To<T>()
                .FirstOrDefaultAsync();

        public async Task<string> GetUserEmailById(string id)
            => await this.userRepository
                .All()
                .Where(u => u.Id == id)
                .Select(u => u.Email)
                .FirstOrDefaultAsync();

        public async Task SetInitialValuesAsync(string id, string displayName, string profilePicture, string ipAddress, string secretKey)
        {
            var user = await this.userRepository
                .All()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            var country = await this.GetUserCountryByIpAsync(ipAddress, secretKey);
            if (country != null)
            {
                user.Country = country;
            }

            user.Profile = new Profile(displayName);
            user.Profile.MainPhotoUrl = GlobalConstants.DefaultMainPhotoUrl;

            await this.userRepository.SaveChangesAsync();
        }

        public async Task<Result> UpdateEmailReceivingAsync(string userId)
        {
            var user = await this.userRepository
                .All()
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return "User does not exist";
            }

            user.Profile.IsReceivingEmails = !user.Profile.IsReceivingEmails;
            await this.userRepository.SaveChangesAsync();

            return true;
        }

        private async Task<string> GetUserCountryByIpAsync(string ipAddress, string secretKey)
        {
            string info = await new WebClient().DownloadStringTaskAsync(GlobalConstants.IpGetterEndpoint + ipAddress + "?access_key=" + secretKey);
            var ipInfo = JsonConvert.DeserializeObject<IpInfo>(info);
            string country = ipInfo.CountryName;

            return country;
        }
    }
}
