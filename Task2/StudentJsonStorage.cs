using System.Text.Json;

class StudentJsonStorage
{
    private readonly string _fileName;
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

    public StudentJsonStorage(string fileName)
    {
        _fileName = fileName;
    }

    public void Save(List<Student> students)
    {
        string json = JsonSerializer.Serialize(students, _options);
        File.WriteAllText(_fileName, json);
    }

    public List<Student> Load()
    {
        string json = File.ReadAllText(_fileName);
        return JsonSerializer.Deserialize<List<Student>>(json) ?? new List<Student>();
    }
}
