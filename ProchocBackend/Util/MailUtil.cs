using ProchocBackend.Database;
using System.Net;
using System.Linq;
using System.Net.Mail;
using static ProchocBackend.Controllers.APIController;
using System.Globalization;

namespace ProchocBackend.Util
{
    public class MailUtil
    {
        static readonly string VerificationEmailBody = @"
<!DOCTYPE html>
<html>
    <head>
        <title>Verification</title>
        <style>
            html {
                margin: 0;
                padding: 0;
                height: 100%;
            }
            body {
                text-align: center;
                font-family: Helvetica, sans-serif;
            }
            button {
                background-color: #3e81ed;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px;
            }
            a a:hover, a:visited, a:link, a:active {
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <script>
            document.
        </script>
        <h1>Willkommen bei Prochoc</h1>
        <br>
        <p>Klicken Sie den Button unterhalb, um Ihren Account zu verifizieren</p>
        <button type=""button""><a href=""$verification_link$"">Verifizieren</a></button>
    </body>
</html>";

        static readonly string CheckoutContent = @"
<html>
    <head>
        <title>Verification</title>
        <style>
            html {
                margin: 0;
                padding: 0;
                height: 100%;
            }
            body {
                text-align: center;
                font-family: Helvetica, sans-serif;
            }
            button {
                background-color: #8fbaff;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px;
            }
        </style>
    </head>
    <body> -->
        <h1 style=""font-size: 3em;"">Bestellbestätigung</h1>
        <h3 style=""font-size: 1em"" > Deine Bestellung ist auf dem Weg!</h3>
        <br>
        $products
        <p>Vielen Dank für ihren Einkauf!</p>
    </body>
</html>";

        private static readonly string ProductEntryBody = @"
<div style=""border: 1px dotted black; width: 32em; display: flex;"" >
    <img style=""width: 5em; height: auto;"" src=""$image"">
    <div style=""display: flex; margin-top: 3em; width: 60%;"" >
        <p style=""font-size: 1em;"">$title</p>
        <span style = ""width: 15em;"" ></ span >
        <p style=""font-size: 1em;"">$stk</p>
        <span style = ""width: 5em;"" ></ span >
        <p style=""font-weight: lighter; float: right;"">$price</p>
    </div>
</div>
";
        public static void SendCheckoutEmail(User user, Basket basket, DeliveryInformation deliveryInformation)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("prochoc.schoki@gmail.com", "HZsxgU3F"),
                EnableSsl = true,
                UseDefaultCredentials = false,
            };

            var body = CheckoutContent
                .Replace("$products",
                    string.Concat(basket.Products.Select(
                        x => ProductEntryBody
                        .Replace("$title", x.Product.Name)
                        .Replace("$image", "https://prochoc.azurewebsites.net/" + x.Product.Picture)
                        .Replace("$stk", x.Count.ToString())
                        .Replace("$price", "€ " + (x.Count * float.Parse(x.Product.Price, CultureInfo.InvariantCulture)))
                    )
                )
            );

            var message = new MailMessage(
                "prochoc.schoki@gmail.com",
                user.Email,
                "Prochoc Account Bestätigung",
                body);
            message.IsBodyHtml = true;
            client.Send(message);
        }

        public static void SendVerificationMail(User user)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("prochoc.schoki@gmail.com", "HZsxgU3F"),
                EnableSsl = true,
                UseDefaultCredentials = false,
            };

            var body = VerificationEmailBody.Replace(
                "$verification_link$",
                $"https://prochoc-webapi.azurewebsites.net/api/prochoc/verify?id={user.Id}");

            var message = new MailMessage(
                "prochoc.schoki@gmail.com",
                user.Email,
                "Prochoc Account Bestätigung",
                body);
            message.IsBodyHtml = true;
            client.Send(message);
        }
    }
}
