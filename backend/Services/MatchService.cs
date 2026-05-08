using Loomi.Backend.Data;
using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Services;

public sealed class MatchService(LoomiDbContext db)
{
    public async Task<List<Profile>> GetMatchesFor(User user)
    {
        var myProfile = await db.Profiles.FirstOrDefaultAsync(x => x.UserId == user.Id)
            ?? throw new ResourceNotFoundException("Profile not found for current user");

        var likedIds = await db.Likes.Where(x => x.FromProfileId == myProfile.Id).Select(x => x.ToProfileId).ToListAsync();
        var matchedIds = await db.Likes
            .Where(x => likedIds.Contains(x.FromProfileId) && x.ToProfileId == myProfile.Id)
            .Select(x => x.FromProfileId)
            .Distinct()
            .ToListAsync();

        return await db.Profiles
            .Include(x => x.User)
            .Include(x => x.Interests)
            .Include(x => x.GenderInterests)
            .Include(x => x.Photos)
            .Where(x => matchedIds.Contains(x.Id))
            .ToListAsync();
    }
}
