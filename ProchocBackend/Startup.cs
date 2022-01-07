<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Startup.cs
=======
using Microsoft.AspNetCore.Authentication.JwtBearer;
>>>>>>> Stashed changes:ProchocBackend/Startup.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Startup.cs
using ProchocBackend.Database;
=======
using Microsoft.IdentityModel.Tokens;
using ProchocBackend.Controllers;
using ProchocBackend.Database;
using System.Text;
>>>>>>> Stashed changes:ProchocBackend/Startup.cs

namespace ProchocBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var mySqlConnectionStr = Configuration.GetConnectionString("DefaultConnection");
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Startup.cs
            services.AddDbContext<ProchocDbContext>(option =>
                option.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr))
                    .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole())));
            
=======
            services.AddDbContext<ProchocDbContext>(options => options.UseSqlServer(
                Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = JwtUtil.JwtIssuer,
                    ValidAudience = JwtUtil.JwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtUtil.JwtSecret))
                };
            });

>>>>>>> Stashed changes:ProchocBackend/Startup.cs
            services.AddControllers();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Startup.cs
            app.UseCors(options => options.WithOrigins("http://localhost:5000").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            app.UseRouting();
=======
            app.UseCors(options => options.WithOrigins("http://localhost:5000", "https://localhost:5001")
                .AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
>>>>>>> Stashed changes:ProchocBackend/Startup.cs
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}