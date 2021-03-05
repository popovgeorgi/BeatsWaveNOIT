namespace BeatsWave.Web.Models.Users
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class UserByEmailServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }
    }
}
