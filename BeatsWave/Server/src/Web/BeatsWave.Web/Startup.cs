namespace BeatsWave.Web
{
    using System;
    using System.Reflection;

    using BeatsWave.Common;
    using BeatsWave.Data;
    using BeatsWave.Data.Common;
    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Data.Repositories;
    using BeatsWave.Data.Seeding;
    using BeatsWave.Services.CronJobs;
    using BeatsWave.Services.Mapping;
    using BeatsWave.Web.Hubs;
    using BeatsWave.Web.Infrastructure.Extensions;
    using BeatsWave.Web.Models;
    using Hangfire;
    using Hangfire.Dashboard;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class Startup
    {
        public Startup(IConfiguration configuration) => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHangfire(this.Configuration);
            services.AddHangfireServer();

            services.AddCors();

            services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(this.Configuration.GetConnectionString("DefaultConnection")));

            services.AddDefaultIdentity<ApplicationUser>(IdentityOptionsProvider.GetIdentityOptions)
                .AddRoles<ApplicationRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddJwtAuthentication(services.GetAppSettings(this.Configuration));

            services.Configure<CookiePolicyOptions>(
                options =>
                    {
                        options.CheckConsentNeeded = context => true;
                        options.MinimumSameSitePolicy = SameSiteMode.None;
                    });

            services.AddSwagger();
            services.AddApiControllers();
            services.AddSignalR();

            services.AddDistributedSqlServerCache(options =>
            {
                options.ConnectionString = this.Configuration.GetConnectionString("DefaultConnection");
                options.SchemaName = "dbo";
                options.TableName = "CacheRecords";
            });

            services.AddSingleton(this.Configuration);

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            // Application services
            services.AddApplicationServices(this.Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IRecurringJobManager recurringJobManager)
        {
            AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly);

            // Seed data on application startup
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
                new ApplicationDbContextSeeder().SeedAsync(dbContext, serviceScope.ServiceProvider).GetAwaiter().GetResult();
                recurringJobManager.AddOrUpdate<GetLatestLikeInformationJob>("GetLatestLikeInformationJob", x => x.Work(null), Cron.Daily, TimeZoneInfo.Utc);
                recurringJobManager.AddOrUpdate<TrainModelJob>("TrainModelJob", x => x.Work(null), Cron.Daily, TimeZoneInfo.Local);
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseHangfireDashboard(
                "/hangfire",
                new DashboardOptions{ Authorization = new[] { new HangfireAuthorizationFilter() } });

            app.UseRouting();

            app.UseCorsPolicy();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(
                endpoints =>
                    {
                        endpoints.MapHub<FeedHub>("/feed");
                        endpoints.MapHub<NotificationHub>("/notification");
                        endpoints.MapControllers();
                        endpoints.MapHangfireDashboard();
                    });
        }

        private class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
        {
            public bool Authorize(DashboardContext context)
            {
                var httpContext = context.GetHttpContext();
                return httpContext.User.IsInRole(GlobalConstants.AdministratorRoleName);
            }
        }
    }
}
