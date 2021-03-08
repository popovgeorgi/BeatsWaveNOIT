namespace BeatsWave.Web.Models.Notifications
{
    using AutoMapper;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using System;

    public class NotificationsByUserServiceModel : IMapFrom<Notification>, IHaveCustomMappings
    {
        public string Message { get; set; }

        public bool IsSeen { get; set; }

        public string Type { get; set; }

        public string InitiatorId { get; set; }

        public string InitiatorImage { get; set; }

        public DateTime CreatedOn { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration
                .CreateMap<Notification, NotificationsByUserServiceModel>()
                .ForMember(n => n.Type, m => m.MapFrom(n => n.Type.ToString()))
                .ForMember(n => n.CreatedOn, m => m.MapFrom(n => n.CreatedOn.AddHours(2)))
                .ForMember(n => n.InitiatorImage, m => m.MapFrom(n => n.Initiator.Profile.MainPhotoUrl));
        }
    }
}
