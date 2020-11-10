﻿namespace BeatsWave.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<T> GetInfo<T>(string id);

        Task<IEnumerable<T>> GetLikedBeatsAsync<T>(string userId);

        Task SetInitialValues(string id, string displayName, string profilePicture);
    }
}
