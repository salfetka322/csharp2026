using Loomi.Backend.Dtos;
using Loomi.Backend.Entities;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Repositories;

namespace Loomi.Backend.Services;

public sealed class ProfileService(IProfileRepository profiles, ILikeRepository likes)
{
    public Task<Profile?> GetByUser(User? user)
    {
        return user is null
            ? Task.FromResult<Profile?>(null)
            : profiles.GetByUserId(user.Id);
    }

    public Task<Profile?> GetById(long id) => profiles.GetById(id);

    public async Task<Profile> SaveOrUpdate(User user, ProfileDto dto)
    {
        var existing = await profiles.GetByUserId(user.Id);
        if (existing is null)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new ArgumentException("Profile name is required");
            }

            if (dto.Age is null or < 18)
            {
                throw new ArgumentException("Profile age must be at least 18");
            }

            existing = new Profile { UserId = user.Id, User = user };
            profiles.Add(existing);
        }

        ApplyScalarFields(existing, dto);
        ReplaceCollections(existing, dto);
        await profiles.SaveChangesAsync();
        return (await profiles.GetById(existing.Id))!;
    }

    public async Task<List<Profile>> GetRecommendationsFor(Profile baseProfile, int limit)
    {
        if (baseProfile.Interests.Count == 0)
        {
            return [];
        }

        var baseInterests = baseProfile.Interests.Select(x => x.Interest).ToHashSet();
        var matchedIds = await GetMatchedProfileIds(baseProfile.Id);
        var allProfiles = await profiles.GetAllExcept(baseProfile.Id);

        return allProfiles
            .Where(x => !matchedIds.Contains(x.Id))
            .Select(profile => new
            {
                Profile = profile,
                Score = profile.Interests.Count(x => baseInterests.Contains(x.Interest))
            })
            .Where(x => x.Score > 0)
            .OrderByDescending(x => x.Score)
            .Take(limit)
            .Select(x => x.Profile)
            .ToList();
    }

    private static void ApplyScalarFields(Profile profile, ProfileDto dto)
    {
        if (!string.IsNullOrWhiteSpace(dto.Name))
        {
            profile.Name = dto.Name.Trim();
        }

        if (dto.Age is not null)
        {
            if (dto.Age < 18 || dto.Age > 120)
            {
                throw new ArgumentException("Age must be between 18 and 120");
            }

            profile.Age = dto.Age.Value;
        }

        if (dto.Bio is not null) profile.Bio = dto.Bio.Trim();
        if (dto.ImageUrl is not null) profile.ImageUrl = dto.ImageUrl.Trim();
        if (dto.Telegram is not null) profile.Telegram = dto.Telegram.Trim();
        if (dto.Location is not null) profile.Location = dto.Location.Trim();
        if (dto.Education is not null) profile.Education = dto.Education.Trim();
        if (dto.Relationships is not null) profile.Relationships = dto.Relationships.Trim();
    }

    private static void ReplaceCollections(Profile profile, ProfileDto dto)
    {
        if (dto.Interests is { Count: > 0 })
        {
            Replace(profile.Interests, Normalize(dto.Interests), x => x.Interest, x => new ProfileInterest { Profile = profile, Interest = x });
        }

        if (dto.GenderInterests is { Count: > 0 })
        {
            Replace(profile.GenderInterests, Normalize(dto.GenderInterests), x => x.GenderInterest, x => new ProfileGenderInterest { Profile = profile, GenderInterest = x });
        }

        if (dto.Photos is { Count: > 0 })
        {
            Replace(profile.Photos, Normalize(dto.Photos), x => x.PhotoUrl, x => new ProfilePhoto { Profile = profile, PhotoUrl = x });
        }
    }

    private async Task<HashSet<long>> GetMatchedProfileIds(long profileId)
    {
        var likedIds = await likes.GetLikedProfileIds(profileId);
        var mutualIds = await likes.GetMutualLikedProfileIds(profileId, likedIds);
        return mutualIds.ToHashSet();
    }

    private static List<string> Normalize(IEnumerable<string> values)
    {
        return values
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => x.Trim())
            .Distinct()
            .ToList();
    }

    private static void Replace<T>(List<T> current, List<string> next, Func<T, string> valueSelector, Func<string, T> factory)
    {
        current.RemoveAll(x => !next.Contains(valueSelector(x)));

        var existing = current.Select(valueSelector).ToHashSet();
        foreach (var value in next.Where(x => !existing.Contains(x)))
        {
            current.Add(factory(value));
        }
    }
}
