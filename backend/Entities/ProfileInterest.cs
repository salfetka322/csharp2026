namespace Loomi.Backend.Entities;

public sealed class ProfileInterest
{
    public long ProfileId { get; set; }
    public Profile Profile { get; set; } = null!;
    public string Interest { get; set; } = string.Empty;
}
