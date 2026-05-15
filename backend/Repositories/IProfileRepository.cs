using Loomi.Backend.Entities;

namespace Loomi.Backend.Repositories;

public interface IProfileRepository
{
    Task<Profile?> GetByUserId(long userId);
    Task<Profile?> GetById(long id);
    Task<List<Profile>> GetAllExcept(long profileId);
    Task<List<Profile>> GetByIds(IReadOnlyCollection<long> ids);
    void Add(Profile profile);
    Task SaveChangesAsync();
}
