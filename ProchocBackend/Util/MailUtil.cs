using ProchocBackend.Database;
using System.Net;
using System.Net.Mail;

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
