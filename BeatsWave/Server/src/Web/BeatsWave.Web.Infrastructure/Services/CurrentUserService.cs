namespace BeatsWave.Web.Infrastructure.Services
{
    using System.Security.Claims;

    using BeatsWave.Web.Infrastructure.Extensions;
    using Microsoft.AspNetCore.Http;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
            => this.user = httpContextAccessor.HttpContext?.User;

        public string GetId()
            => this.user?.GetId();

        public string GetUserName()
            => this.user?.Identity?.Name;
    }
}
