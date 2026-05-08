namespace Loomi.Backend.Dtos;

public sealed class AuthResponse
{
    public string AccessToken { get; set; } = string.Empty;
    public string Token => AccessToken;
    public UserDto? User { get; set; }
}
