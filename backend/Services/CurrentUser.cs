using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Loomi.Backend.Entities;
using Loomi.Backend.Repositories;

namespace Loomi.Backend.Services;

public static class CurrentUser
{
    public static async Task<User?> Resolve(HttpContext context, IUserRepository users)
    {
        var email = context.User.FindFirstValue(ClaimTypes.Email)
            ?? context.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? context.User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            ?? context.User.FindFirstValue("sub");

        return string.IsNullOrWhiteSpace(email)
            ? null
            : await users.GetByEmail(email);
    }
}
