 namespace BeatsWave.Web.Infrastructure.Extensions
{
    using System.Text;
    using System.Threading.Tasks;

    using BeatsWave.Services.Data;
    using BeatsWave.Services.Messaging;
    using BeatsWave.Web.Infrastructure.Filters;
    using BeatsWave.Web.Infrastructure.Services;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;

    public static class ServiceCollectionExtensions
    {
        public static AppSettings GetAppSettings(this IServiceCollection services, IConfiguration configuration)
        {
            var applicationSettingsConfiguration = configuration.GetSection("ApplicationSettings");
            services.Configure<AppSettings>(applicationSettingsConfiguration);
            return applicationSettingsConfiguration.Get<AppSettings>();
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, AppSettings appSettings)
        {
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                    x.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];

                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                path.StartsWithSegments("/notification"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        },
                    };
                });

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
            => services
            .AddTransient<IEmailSender>(x => new SendGridEmailSender(configuration.GetSection("SendGrid:AccessKey").Value))
            .AddTransient<IIdentityService, IdentityService>()
            .AddTransient<IProfileService, ProfileService>()
            .AddTransient<ICurrentUserService, CurrentUserService>()
            .AddTransient<IPictureService, PictureService>()
            .AddTransient<IArtistService, ArtistService>()
            .AddTransient<IFollowService, FollowService>()
            .AddTransient<IBeatService, BeatService>()
            .AddTransient<IUserService, UserService>()
            .AddTransient<ILikeService, LikeService>()
            .AddTransient<ICommentService, CommentService>()
            .AddTransient<IEventService, EventService>()
            .AddTransient<ISubscriptionService, SubscriptionService>()
            .AddTransient<IAnalyticsService, AnalyticsService>()
            .AddTransient<ISearchService, SearchService>()
            .AddTransient<INotificationService, NotificationService>();

        public static IServiceCollection AddSwagger(this IServiceCollection services)
            => services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(
                    "v1",
                    new OpenApiInfo
                    {
                        Title = "BeatsWave API",
                        Version = "v1",
                    });
            });

        public static void AddApiControllers(this IServiceCollection services)
            => services
                .AddControllers(options => options.Filters.Add<ModelOrNotFoundActionFilter>());
    }
}
