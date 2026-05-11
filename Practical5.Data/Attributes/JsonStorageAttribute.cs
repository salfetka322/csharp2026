namespace Practical5.Data.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class JsonStorageAttribute : Attribute
{
    public string FileName { get; }

    public JsonStorageAttribute(string fileName)
    {
        FileName = fileName;
    }
}
