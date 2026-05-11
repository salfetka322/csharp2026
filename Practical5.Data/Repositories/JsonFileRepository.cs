using System.Reflection;
using Practical5.Data.Attributes;
using Practical5.Data.Interfaces;

namespace Practical5.Data.Repositories;

public class JsonFileRepository<T> : IRepository<T> where T : class, IEntity
{
    private readonly IDataSerializer _serializer;
    private readonly string _filePath;

    public JsonFileRepository(IDataSerializer serializer, string dataDirectory)
    {
        _serializer = serializer;
        Directory.CreateDirectory(dataDirectory);
        _filePath = Path.Combine(dataDirectory, GetFileName());
    }

    public List<T> GetAll()
    {
        return Load();
    }

    public T? GetById(Guid id)
    {
        return Load().FirstOrDefault(item => item.Id == id);
    }

    public void Add(T item)
    {
        List<T> items = Load();
        items.Add(item);
        Save(items);
    }

    public void Update(T item)
    {
        List<T> items = Load();
        int index = items.FindIndex(current => current.Id == item.Id);

        if (index == -1)
        {
            throw new InvalidOperationException("Item was not found.");
        }

        items[index] = item;
        Save(items);
    }

    public void Delete(Guid id)
    {
        List<T> items = Load();
        items.RemoveAll(item => item.Id == id);
        Save(items);
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await LoadAsync();
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        List<T> items = await LoadAsync();
        return items.FirstOrDefault(item => item.Id == id);
    }

    public async Task AddAsync(T item)
    {
        List<T> items = await LoadAsync();
        items.Add(item);
        await SaveAsync(items);
    }

    public async Task UpdateAsync(T item)
    {
        List<T> items = await LoadAsync();
        int index = items.FindIndex(current => current.Id == item.Id);

        if (index == -1)
        {
            throw new InvalidOperationException("Item was not found.");
        }

        items[index] = item;
        await SaveAsync(items);
    }

    public async Task DeleteAsync(Guid id)
    {
        List<T> items = await LoadAsync();
        items.RemoveAll(item => item.Id == id);
        await SaveAsync(items);
    }

    private List<T> Load()
    {
        if (!File.Exists(_filePath))
        {
            return new List<T>();
        }

        string json = File.ReadAllText(_filePath);
        return _serializer.Deserialize<List<T>>(json) ?? new List<T>();
    }

    private void Save(List<T> items)
    {
        string json = _serializer.Serialize(items);
        File.WriteAllText(_filePath, json);
    }

    private async Task<List<T>> LoadAsync()
    {
        if (!File.Exists(_filePath))
        {
            return new List<T>();
        }

        string json = await File.ReadAllTextAsync(_filePath);
        return _serializer.Deserialize<List<T>>(json) ?? new List<T>();
    }

    private async Task SaveAsync(List<T> items)
    {
        string json = _serializer.Serialize(items);
        await File.WriteAllTextAsync(_filePath, json);
    }

    private static string GetFileName()
    {
        JsonStorageAttribute? attribute = typeof(T).GetCustomAttribute<JsonStorageAttribute>();

        if (attribute == null)
        {
            return typeof(T).Name.ToLower() + ".json";
        }

        return attribute.FileName;
    }
}
