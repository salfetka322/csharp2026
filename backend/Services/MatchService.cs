using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Repositories;

namespace Loomi.Backend.Services;

public sealed class MatchService(IProfileRepository profiles, ILikeRepository likes)
{
    public async Task<List<Profile>> GetMatchesFor(User user)
    {
        var myProfile = await profiles.GetByUserId(user.Id)
            ?? throw new ResourceNotFoundException("Profile not found for current user");

        var likedIds = await likes.GetLikedProfileIds(myProfile.Id);
        var matchedIds = await likes.GetMutualLikedProfileIds(myProfile.Id, likedIds);
        return await profiles.GetByIds(matchedIds);
    }
}
