using Practical5.Data.Interfaces;

namespace Practical5.Data.Services;

public class BaseService<T> : IService<T> where T : class, IEntity
{
    protected readonly IRepository<T> Repository;

    public BaseService(IRepository<T> repository)
    {
        Repository = repository;
    }

    public List<T> GetAll()
    {
        return Repository.GetAll();
    }

    public T? GetById(Guid id)
    {
        return Repository.GetById(id);
    }

    public void Add(T item)
    {
        Repository.Add(item);
    }

    public void Update(T item)
    {
        Repository.Update(item);
    }

    public void Delete(Guid id)
    {
        Repository.Delete(id);
    }

    public Task<List<T>> GetAllAsync()
    {
        return Repository.GetAllAsync();
    }

    public Task<T?> GetByIdAsync(Guid id)
    {
        return Repository.GetByIdAsync(id);
    }

    public Task AddAsync(T item)
    {
        return Repository.AddAsync(item);
    }

    public Task UpdateAsync(T item)
    {
        return Repository.UpdateAsync(item);
    }

    public Task DeleteAsync(Guid id)
    {
        return Repository.DeleteAsync(id);
    }
}
