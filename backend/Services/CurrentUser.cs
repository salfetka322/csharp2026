using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Loomi.Backend.Data;
using Loomi.Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Services;

public static class CurrentUser
{
    public static async Task<User?> Resolve(HttpContext context, LoomiDbContext db)
    {
        var email = context.User.FindFirstValue(ClaimTypes.Email)
            ?? context.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? context.User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            ?? context.User.FindFirstValue("sub");

        return string.IsNullOrWhiteSpace(email)
            ? null
            : await db.Users.FirstOrDefaultAsync(x => x.Email == email);
    }
}
