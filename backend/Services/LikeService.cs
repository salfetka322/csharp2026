using Loomi.Backend.Dtos;
using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Repositories;

namespace Loomi.Backend.Services;

public sealed class LikeService(IProfileRepository profiles, ILikeRepository likes)
{
    public async Task<LikeDto> Like(User user, long toProfileId)
    {
        var fromProfile = await profiles.GetByUserId(user.Id)
            ?? throw new ResourceNotFoundException("Profile not found for current user");

        var toProfile = await profiles.GetById(toProfileId)
            ?? throw new ResourceNotFoundException("Target profile not found");

        if (fromProfile.Id == toProfile.Id)
        {
            throw new ArgumentException("Cannot like your own profile");
        }

        var exists = await likes.Exists(fromProfile.Id, toProfile.Id);
        if (!exists)
        {
            likes.Add(new Like { FromProfileId = fromProfile.Id, ToProfileId = toProfile.Id });
            await likes.SaveChangesAsync();
        }

        var isMatch = await likes.Exists(toProfile.Id, fromProfile.Id);
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
