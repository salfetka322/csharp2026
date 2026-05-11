using System.Text.Json.Serialization;

class Book
{
    public string Title { get; set; } = string.Empty;

    [JsonIgnore]
    public Author? Author { get; set; }
}
