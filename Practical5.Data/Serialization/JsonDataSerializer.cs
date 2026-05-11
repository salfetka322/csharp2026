using System.Text.Json;
using Practical5.Data.Interfaces;

namespace Practical5.Data.Serialization;

public class JsonDataSerializer : IDataSerializer
{
    private readonly JsonSerializerOptions _options;

    public JsonDataSerializer()
    {
        _options = new JsonSerializerOptions
        {
            WriteIndented = true
        };
    }

    public string Serialize<T>(T value)
    {
        return JsonSerializer.Serialize(value, _options);
    }

    public T? Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, _options);
    }
}
