namespace BeatsWave.Services.Data
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName, string role, string secret);
    }
}
