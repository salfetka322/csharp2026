using Practical5.Data.Attributes;
using Practical5.Data.Interfaces;

namespace Practical5.Data.Models;

[JsonStorage("books.json")]
public class Book : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int Year { get; set; }
}
