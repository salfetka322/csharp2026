using System.Text.Json;
using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Services;

public sealed class GoogleAuthService(LoomiDbContext db, AuthService authService, IHttpClientFactory httpClientFactory)
{
    private const string GoogleTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";

    public async Task<AuthResponse> AuthenticateWithGoogle(string idToken)
    {
        try
        {
            var client = httpClientFactory.CreateClient();
            var response = await client.GetAsync(GoogleTokenInfoUrl + Uri.EscapeDataString(idToken));
            if (!response.IsSuccessStatusCode)
            {
                throw new BadCredentialsException("Invalid Google token");
            }

            await using var stream = await response.Content.ReadAsStreamAsync();
            using var document = await JsonDocument.ParseAsync(stream);
            var root = document.RootElement;
            if (root.TryGetProperty("error", out _) || !root.TryGetProperty("email", out var emailProperty))
            {
                throw new BadCredentialsException("Google token does not contain email");
            }

            var email = emailProperty.GetString();
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new BadCredentialsException("Google token does not contain email");
            }

            var user = await db.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user is null)
            {
                user = new User { Email = email, Password = null };
                db.Users.Add(user);
                await db.SaveChangesAsync();
            }

            return authService.BuildResponse(user);
        }
        catch (BadCredentialsException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new BadCredentialsException("Failed to authenticate with Google: " + ex.Message);
        }
    }
}
