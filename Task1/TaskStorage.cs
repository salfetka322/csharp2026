using System.Text.Json;

class TaskStorage
{
    private readonly string _fileName;
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

    public TaskStorage(string fileName)
    {
        _fileName = fileName;
    }

    public List<TaskItem> Load()
    {
        if (!File.Exists(_fileName))
        {
            return new List<TaskItem>();
        }

        string json = File.ReadAllText(_fileName);
        return JsonSerializer.Deserialize<List<TaskItem>>(json) ?? new List<TaskItem>();
    }

    public void Save(List<TaskItem> tasks)
    {
        string json = JsonSerializer.Serialize(tasks, _options);
        File.WriteAllText(_fileName, json);
    }
}
