using Practical5.Data.Attributes;
using Practical5.Data.Interfaces;

namespace Practical5.Data.Models;

[JsonStorage("orders.json")]
public class Order : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid BookId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public string Status { get; set; } = "Created";
}
