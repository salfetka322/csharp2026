using Loomi.Backend.Dtos;
using Loomi.Backend.Entities;

namespace Loomi.Backend.Mapping;

public static class ProfileMapper
{
    public static ProfileDto ToDto(Profile profile)
    {
        return new ProfileDto
        {
            Id = profile.Id,
            Name = profile.Name,
            Age = profile.Age,
            Bio = profile.Bio,
            ImageUrl = profile.ImageUrl,
            Telegram = profile.Telegram,
            Location = profile.Location,
            Education = profile.Education,
            Relationships = profile.Relationships,
            Interests = profile.Interests.Select(x => x.Interest).ToList(),
            GenderInterests = profile.GenderInterests.Select(x => x.GenderInterest).ToList(),
            Photos = profile.Photos.Select(x => x.PhotoUrl).ToList(),
            Email = profile.User.Email,
            UserId = profile.UserId
        };
    }
}
