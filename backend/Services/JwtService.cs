using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Loomi.Backend.Services;

public sealed class JwtService(IConfiguration configuration)
{
    public string GenerateToken(string email)
    {
        var secret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? configuration["Jwt:Secret"]!;
        var expirationMsText = Environment.GetEnvironmentVariable("JWT_EXPIRATION_MS") ?? configuration["Jwt:ExpirationMs"] ?? "86400000";
        var expirationMs = long.TryParse(expirationMsText, out var parsed) ? parsed : 86400000;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: [new Claim(JwtRegisteredClaimNames.Sub, email), new Claim(ClaimTypes.Email, email)],
            expires: DateTime.UtcNow.AddMilliseconds(expirationMs),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
