using System.ComponentModel.DataAnnotations;

namespace Loomi.Backend.Dtos;

public sealed class GoogleAuthRequest
{
    [Required]
    public string IdToken { get; set; } = string.Empty;
}
