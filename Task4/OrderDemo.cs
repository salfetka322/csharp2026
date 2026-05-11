using System.Text.Json;
using System.Text.Json.Serialization;

class OrderDemo
{
    public void Run()
    {
        Order order = new Order { Id = 1, Status = OrderStatus.Processing };

        JsonSerializerOptions indentedOptions = new JsonSerializerOptions { WriteIndented = true };
        string numberJson = JsonSerializer.Serialize(order, indentedOptions);
        Console.WriteLine("Enum як число:");
        Console.WriteLine(numberJson);

        JsonSerializerOptions textEnumOptions = new JsonSerializerOptions { WriteIndented = true };
        textEnumOptions.Converters.Add(new JsonStringEnumConverter());

        string textJson = JsonSerializer.Serialize(order, textEnumOptions);
        File.WriteAllText("order.json", textJson);

        Console.WriteLine("Enum як текст:");
        Console.WriteLine(textJson);

        Order? loadedOrder = JsonSerializer.Deserialize<Order>(textJson, textEnumOptions);
        Console.WriteLine($"Deserialized: Id = {loadedOrder?.Id}, Status = {loadedOrder?.Status}");
    }
}
