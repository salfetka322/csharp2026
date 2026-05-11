using Practical5.Data.Attributes;
using Practical5.Data.Interfaces;

namespace Practical5.Data.Models;

[JsonStorage("users.json")]
public class User : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
