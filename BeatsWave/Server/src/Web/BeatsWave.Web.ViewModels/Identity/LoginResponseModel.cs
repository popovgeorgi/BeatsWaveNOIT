namespace BeatsWave.Web.Models.Identity
{
    public class LoginResponseModel
    {
        public string Id { get; set; }

        public string MainPhotoUrl { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public string Role { get; set; }

        public string Token { get; set; }
    }
}
