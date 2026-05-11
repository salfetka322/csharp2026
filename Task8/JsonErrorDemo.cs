using System.Text.Json;

class JsonErrorDemo
{
    private readonly string _fileName;

    public JsonErrorDemo(string fileName)
    {
        _fileName = fileName;
    }

    public void Run()
    {
        if (!File.Exists(_fileName))
        {
            File.WriteAllText(_fileName, "{ invalid json ");
        }

        try
        {
            string json = File.ReadAllText(_fileName);
            List<TaskItem> tasks = JsonSerializer.Deserialize<List<TaskItem>>(json) ?? new List<TaskItem>();
            Console.WriteLine("Файл прочитано. Кількість задач: " + tasks.Count);
        }
        catch (JsonException exception)
        {
            Console.WriteLine("Помилка JSON. Програма не завершується аварійно.");
            Console.WriteLine(exception.Message);
        }
        catch (IOException exception)
        {
            Console.WriteLine("Помилка читання файлу.");
            Console.WriteLine(exception.Message);
        }
    }
}
