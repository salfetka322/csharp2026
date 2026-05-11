using System.Text.Json;

class AnimalDemo
{
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

    public void Run()
    {
        List<Animal> animals = new List<Animal>
        {
            new Dog { Name = "Rex", BarkVolume = 8 },
            new Cat { Name = "Murka", Lives = 9 }
        };

        string json = JsonSerializer.Serialize(animals, _options);
        File.WriteAllText("animals.json", json);
        Console.WriteLine(json);

        List<Animal> loadedAnimals = JsonSerializer.Deserialize<List<Animal>>(json, _options) ?? new List<Animal>();

        foreach (Animal animal in loadedAnimals)
        {
            Console.WriteLine($"{animal.Name}: {animal.GetType().Name}");
        }
    }
}
