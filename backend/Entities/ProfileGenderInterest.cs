namespace Loomi.Backend.Entities;

public sealed class ProfileGenderInterest
{
    public long ProfileId { get; set; }
    public Profile Profile { get; set; } = null!;
    public string GenderInterest { get; set; } = string.Empty;
}
