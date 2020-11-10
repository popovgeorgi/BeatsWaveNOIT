using AutoMapper;
using BeatsWave.Data.Models;
using BeatsWave.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeatsWave.Web.Models.Users
{
    public class UserInfoServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string ProfileMainPhotoUrl { get; set; }

        public string ProfileFirstName { get; set; }

        public string ProfileLastName { get; set; }

        public string ProfileDisplayName { get; set; }
    }
}
