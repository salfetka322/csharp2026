using Loomi.Backend.Data;
using Loomi.Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Repositories;

public sealed class ProfileRepository(LoomiDbContext db) : IProfileRepository
{
    public Task<Profile?> GetByUserId(long userId)
    {
        return QueryProfiles().FirstOrDefaultAsync(x => x.UserId == userId);
    }

    public Task<Profile?> GetById(long id)
    {
        return QueryProfiles().FirstOrDefaultAsync(x => x.Id == id);
    }

    public Task<List<Profile>> GetAllExcept(long profileId)
    {
        return QueryProfiles().Where(x => x.Id != profileId).ToListAsync();
    }

    public Task<List<Profile>> GetByIds(IReadOnlyCollection<long> ids)
    {
        return ids.Count == 0
            ? Task.FromResult(new List<Profile>())
            : QueryProfiles().Where(x => ids.Contains(x.Id)).ToListAsync();
    }

    public void Add(Profile profile)
    {
        db.Profiles.Add(profile);
    }

    public Task SaveChangesAsync()
    {
        return db.SaveChangesAsync();
    }

    private IQueryable<Profile> QueryProfiles()
    {
        return db.Profiles
            .Include(x => x.User)
            .Include(x => x.Interests)
            .Include(x => x.GenderInterests)
            .Include(x => x.Photos);
    }
}
