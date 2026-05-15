using Loomi.Backend.Data;
using Loomi.Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Repositories;

public sealed class LikeRepository(LoomiDbContext db) : ILikeRepository
{
    public Task<bool> Exists(long fromProfileId, long toProfileId)
    {
        return db.Likes.AnyAsync(x => x.FromProfileId == fromProfileId && x.ToProfileId == toProfileId);
    }

    public Task<List<long>> GetLikedProfileIds(long fromProfileId)
    {
        return db.Likes
            .Where(x => x.FromProfileId == fromProfileId)
            .Select(x => x.ToProfileId)
            .ToListAsync();
    }

    public Task<List<long>> GetMutualLikedProfileIds(long profileId, IReadOnlyCollection<long> likedIds)
    {
        return likedIds.Count == 0
            ? Task.FromResult(new List<long>())
            : db.Likes
                .Where(x => likedIds.Contains(x.FromProfileId) && x.ToProfileId == profileId)
                .Select(x => x.FromProfileId)
                .Distinct()
                .ToListAsync();
    }

    public void Add(Like like)
    {
        db.Likes.Add(like);
    }

    public Task SaveChangesAsync()
    {
        return db.SaveChangesAsync();
    }
}
