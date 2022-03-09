using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ProchocBackend.Util;

namespace ProchocBackend
{
    public class Program
    {
        public static string UploadDir = string.Empty;

        public static void Main(string[] args)
        {
            UploadDir = Path.Combine(Directory.GetCurrentDirectory(), "data");
            Directory.CreateDirectory(UploadDir);
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    //webBuilder.UseStartup<Startup>().UseUrls("http://localhost:80", "https://localhost:443");
                    webBuilder.UseStartup<Startup>().UseUrls("http://0.0.0.0:4040", "https://0.0.0.0:4041");
                });
    }
}