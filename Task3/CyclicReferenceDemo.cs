using System.Text.Json;

class CyclicReferenceDemo
{
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

    public void Run()
    {
        Author author = CreateAuthor();

        Console.WriteLine("Причина помилки: Author містить Books, а Book знову містить Author.");
        Console.WriteLine("Виправлення: властивість Book.Author позначена атрибутом [JsonIgnore].");

        string json = JsonSerializer.Serialize(author, _options);
        File.WriteAllText("author.json", json);
        Console.WriteLine(json);
    }

    private static Author CreateAuthor()
    {
        Author author = new Author { Name = "Taras Shevchenko" };

        author.Books.Add(new Book { Title = "Kobzar", Author = author });
        author.Books.Add(new Book { Title = "Haidamaky", Author = author });

        return author;
    }
}
