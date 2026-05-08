using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Services;

public sealed class LikeService(LoomiDbContext db)
{
    public async Task<LikeDto> Like(User user, long toProfileId)
    {
        var fromProfile = await db.Profiles.FirstOrDefaultAsync(x => x.UserId == user.Id)
            ?? throw new ResourceNotFoundException("Profile not found for current user");

        var toProfile = await db.Profiles.FirstOrDefaultAsync(x => x.Id == toProfileId)
            ?? throw new ResourceNotFoundException("Target profile not found");

        if (fromProfile.Id == toProfile.Id)
        {
            throw new ArgumentException("Cannot like your own profile");
        }

        var exists = await db.Likes.AnyAsync(x => x.FromProfileId == fromProfile.Id && x.ToProfileId == toProfile.Id);
        if (!exists)
        {
            db.Likes.Add(new Like { FromProfileId = fromProfile.Id, ToProfileId = toProfile.Id });
            await db.SaveChangesAsync();
        }

        var isMatch = await db.Likes.AnyAsync(x => x.FromProfileId == toProfile.Id && x.ToProfileId == fromProfile.Id);
        return BuildResponse(isMatch, toProfile);
    }

    private static LikeDto BuildResponse(bool isMatch, Profile target)
    {
        return new LikeDto
        {
            ToProfileId = target.Id,
            Status = isMatch ? "MATCHED" : "LIKED",
            MatchProfileId = isMatch ? target.Id : null,
            MatchProfileName = isMatch ? target.Name : null,
            Telegram = isMatch ? target.Telegram : null
        };
    }
}
