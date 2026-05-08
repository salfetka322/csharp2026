namespace Loomi.Backend.Entities;

public sealed class ProfilePhoto
{
    public long ProfileId { get; set; }
    public Profile Profile { get; set; } = null!;
    public string PhotoUrl { get; set; } = string.Empty;
}
