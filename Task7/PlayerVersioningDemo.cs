using System.Text.Json;

class PlayerVersioningDemo
{
    public void Run()
    {
        string oldJson = """
        {
          "Name": "Old Player"
        }
        """;

        File.WriteAllText("old_player.json", oldJson);

        Player player = JsonSerializer.Deserialize<Player>(oldJson) ?? new Player();

        if (player.Level == 0)
        {
            player.Level = 1;
        }

        Console.WriteLine($"Name: {player.Name}");
        Console.WriteLine($"Level: {player.Level}");
        Console.WriteLine("Старий JSON завантажено у нову модель. Нове поле отримало значення за замовчуванням.");
    }
}
