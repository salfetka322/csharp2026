namespace Loomi.Backend.Entities;

public sealed class User
{
    public long Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Password { get; set; }
    public Profile? Profile { get; set; }
}
