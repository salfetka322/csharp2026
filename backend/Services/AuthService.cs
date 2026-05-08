using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Services;

public sealed class AuthService(LoomiDbContext db, JwtService jwtService)
{
    public async Task<AuthResponse> Register(string email, string password)
    {
        email = email.Trim();
        if (await db.Users.AnyAsync(x => x.Email == email))
        {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        var user = new User
        {
            Email = email,
            Password = BCrypt.Net.BCrypt.HashPassword(password)
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();
        return BuildResponse(user);
    }

    public async Task<AuthResponse> Login(string email, string password)
    {
        email = email.Trim();
        var user = await db.Users.FirstOrDefaultAsync(x => x.Email == email)
            ?? throw new BadCredentialsException("Invalid email or password");

        if (string.IsNullOrWhiteSpace(user.Password))
        {
            throw new BadCredentialsException("This account was registered with Google. Please use Google Sign-In.");
        }

        if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            throw new BadCredentialsException("Invalid email or password");
        }

        return BuildResponse(user);
    }

    public AuthResponse Refresh(User user) => BuildResponse(user);

    public AuthResponse BuildResponse(User user)
    {
        return new AuthResponse
        {
            AccessToken = jwtService.GenerateToken(user.Email),
            User = new UserDto { Id = user.Id, Email = user.Email }
        };
    }
}
