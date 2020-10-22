using AutoMapper;
using BeatsWave.Data.Models;
using BeatsWave.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeatsWave.Web.Models.Users
{
    public class UserInfoServiceModel : IMapFrom<ApplicationUser>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public string ProfileMainPhotoUrl { get; set; }

        public string Name { get; set; }

        public string ProfileDisplayName { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<ApplicationUser, UserInfoServiceModel>()
                .ForMember(u => u.Name, m => m.MapFrom(u => u.Profile.FirstName + " " + u.Profile.LastName));
        }
    }
}
