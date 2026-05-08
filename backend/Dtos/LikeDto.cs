using System.ComponentModel.DataAnnotations;

namespace Loomi.Backend.Dtos;

public sealed class LikeDto
{
    [Required]
    public long? ToProfileId { get; set; }
    public string? Status { get; set; }
    public long? MatchProfileId { get; set; }
    public string? MatchProfileName { get; set; }
    public string? Telegram { get; set; }
}
