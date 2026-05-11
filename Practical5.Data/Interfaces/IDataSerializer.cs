namespace Practical5.Data.Interfaces;

public interface IDataSerializer
{
    string Serialize<T>(T value);
    T? Deserialize<T>(string json);
}
