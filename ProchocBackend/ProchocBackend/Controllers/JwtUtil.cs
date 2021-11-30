using ProchocBackend.Database;
using System.Security.Claims;
using System.Collections.Generic;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ProchocBackend.Controllers
{
    public class JwtUtil
    {
        public static string JwtSecret = "fabio lehner geht sparsam mit geld um";
        public static string JwtIssuer = "https://prochoc.com";
        public static string JwtAudience = "https://prochoc.com/api";

        public static string CreateJwtFromUser(User user)
        {
            var claims = new List<Claim>();
            var expirationDate = DateTime.Now.Add(TimeSpan.FromHours(72));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")));
            claims.Add(new Claim(JwtRegisteredClaimNames.Exp, expirationDate.Ticks.ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.UniqueName, user.Email));

            // Create the credentials used to generate the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Generate the JWT token
            var token = new JwtSecurityToken(
                issuer: JwtIssuer,
                audience: JwtAudience,
                expires: expirationDate,
                claims: claims,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
