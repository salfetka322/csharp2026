using System.ComponentModel.DataAnnotations;

namespace Loomi.Backend.Dtos;

public sealed class ProfileDto
{
    public long? Id { get; set; }

    [Required]
    public string? Name { get; set; }

    [Range(18, 120)]
    public int? Age { get; set; }

    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
    public string? Telegram { get; set; }
    public string? Location { get; set; }
    public string? Education { get; set; }
    public List<string>? Interests { get; set; }
    public List<string>? GenderInterests { get; set; }
    public string? Relationships { get; set; }
    public List<string>? Photos { get; set; }
    public string? Email { get; set; }
    public long? UserId { get; set; }
}
