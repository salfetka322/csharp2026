using Loomi.Backend.Entities;

namespace Loomi.Backend.Repositories;

public interface ILikeRepository
{
    Task<bool> Exists(long fromProfileId, long toProfileId);
    Task<List<long>> GetLikedProfileIds(long fromProfileId);
    Task<List<long>> GetMutualLikedProfileIds(long profileId, IReadOnlyCollection<long> likedIds);
    void Add(Like like);
    Task SaveChangesAsync();
}
