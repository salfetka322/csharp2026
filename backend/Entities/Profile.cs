namespace Loomi.Backend.Entities;

public sealed class Profile
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
    public string? Telegram { get; set; }
    public string? Location { get; set; }
    public string? Education { get; set; }
    public string? Relationships { get; set; }
    public long UserId { get; set; }
    public User User { get; set; } = null!;
    public List<ProfileInterest> Interests { get; set; } = [];
    public List<ProfileGenderInterest> GenderInterests { get; set; } = [];
    public List<ProfilePhoto> Photos { get; set; } = [];
}
