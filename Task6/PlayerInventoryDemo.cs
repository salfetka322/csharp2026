using System.Text.Json;

class PlayerInventoryDemo
{
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

    public void Run()
    {
        Player player = new Player
        {
            Name = "Knight",
            Inventory = new Inventory
            {
                Items = new List<string> { "Sword", "Shield", "Potion" }
            }
        };

        string json = JsonSerializer.Serialize(player, _options);
        File.WriteAllText("player.json", json);
        Console.WriteLine("Файл player.json створено.");

        string jsonWithoutInventory = """
        {
          "Name": "Knight"
        }
        """;

        Player loadedPlayer = JsonSerializer.Deserialize<Player>(jsonWithoutInventory) ?? new Player();
        loadedPlayer.Inventory ??= new Inventory();

        Console.WriteLine($"Player: {loadedPlayer.Name}");
        Console.WriteLine("Inventory items: " + loadedPlayer.Inventory.Items.Count);
    }
}
