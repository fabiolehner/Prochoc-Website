using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ProchocBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Program.cs
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
=======
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    //webBuilder.UseStartup<Startup>().UseUrls("http://localhost:80", "https://localhost:443");
                    webBuilder.UseStartup<Startup>().UseUrls("http://localhost:5000", "https://localhost:5001");
                });
>>>>>>> Stashed changes:ProchocBackend/Program.cs
    }
}