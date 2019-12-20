using System;
using System.Collections.Generic;
using System.Linq;
using Deposit_2.Context;
using Deposit_2.Services;
using Deposit_2.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Deposit_2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IEmailSender, EmailService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<SecurityService>();

            var config = new ApplicationConfiguration();
            var configSections = new List<string>
            {
                "ApplicationConfiguration",
                "SmtpConfiguration",
                "SecurityConfiguration",
                "ConnectionStrings"
            };
            configSections.ForEach(section => Configuration.Bind(section, config));

            services.AddSingleton(config);


            services.AddDbContext<UserContext>(options => options.UseSqlite(config.DefaultConnectionString));

            services.AddCors();

            /*services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
            ));*/
            services.AddSwaggerGen();
            services.ConfigureSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info { Title = "Deposit API", Version = "v1" });

            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "Deposit API"));
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());
            app.UseHttpsRedirection();
            app.UseMvcWithDefaultRoute();

            using (var scope = app.ApplicationServices.CreateScope())
            {
                using (var contex = scope.ServiceProvider.GetService<UserContext>())
                {
                    contex.Database.Migrate();
                }
            }
        }
    }
}
