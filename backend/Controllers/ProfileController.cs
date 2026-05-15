using Loomi.Backend.Dtos;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Mapping;
using Loomi.Backend.Repositories;
using Loomi.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loomi.Backend.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public sealed class ProfileController(
    ProfileService profileService,
    FileStorageService fileStorageService,
    IUserRepository users) : ControllerBase
{
    [HttpGet("me")]
    public async Task<ActionResult<ProfileDto>> GetMyProfile()
    {
        var user = await CurrentUser.Resolve(HttpContext, users) ?? throw new ResourceNotFoundException("User not authenticated");
        var profile = await profileService.GetByUser(user) ?? throw new ResourceNotFoundException("Profile not found");
        return Ok(ProfileMapper.ToDto(profile));
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<ProfileDto>> CreateOrUpdateProfile([FromForm] ProfileForm form)
    {
        var user = await CurrentUser.Resolve(HttpContext, users) ?? throw new ResourceNotFoundException("User not authenticated");
        if (string.IsNullOrWhiteSpace(form.Name))
        {
            throw new ArgumentException("Name is required");
        }

        var existing = await profileService.GetByUser(user);
        var photoUrls = existing?.Photos.Select(x => x.PhotoUrl).ToList() ?? [];
        if (form.ExistingPhotos is { Count: > 0 })
        {
            photoUrls = form.ExistingPhotos.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x.Trim()).ToList();
        }

        var newPhotos = await fileStorageService.SaveFiles(Request.Form.Files);
        photoUrls.AddRange(newPhotos);

        var dto = new ProfileDto
        {
            Id = existing?.Id,
            Name = form.Name.Trim(),
            Age = ParseAge(form.Age),
            Bio = form.Bio,
            Telegram = form.Telegram,
            Location = form.Location,
            Education = form.Education,
            Relationships = form.Relationships ?? form.PurposeRelationships,
            Interests = form.Interests,
            GenderInterests = form.GenderInterests,
            Photos = photoUrls,
            Email = user.Email
        };

        var saved = await profileService.SaveOrUpdate(user, dto);
        return StatusCode(StatusCodes.Status201Created, ProfileMapper.ToDto(saved));
    }

    [HttpPut]
    public async Task<ActionResult<ProfileDto>> UpdateProfile([FromBody] ProfileDto dto)
    {
        var user = await CurrentUser.Resolve(HttpContext, users) ?? throw new ResourceNotFoundException("User not authenticated");
        var existing = await profileService.GetByUser(user) ?? throw new ResourceNotFoundException("Profile not found");
        dto.Id = existing.Id;
        dto.Photos = dto.Photos is { Count: > 0 } ? dto.Photos : existing.Photos.Select(x => x.PhotoUrl).ToList();

        var saved = await profileService.SaveOrUpdate(user, dto);
        return Ok(ProfileMapper.ToDto(saved));
    }

    private static int? ParseAge(string? age)
    {
        if (string.IsNullOrWhiteSpace(age))
        {
            return null;
        }

        if (!int.TryParse(age.Trim(), out var parsed))
        {
            throw new ArgumentException("Invalid age format");
        }

        if (parsed is < 18 or > 120)
        {
            throw new ArgumentException("Age must be between 18 and 120");
        }

        return parsed;
    }
}

public sealed class ProfileForm
{
    public string? Name { get; set; }
    public string? Age { get; set; }
    public string? Bio { get; set; }
    public string? Telegram { get; set; }
    public string? Location { get; set; }
    public string? Education { get; set; }
    public string? Relationships { get; set; }
    public string? PurposeRelationships { get; set; }
    public List<string>? Interests { get; set; }
    public List<string>? GenderInterests { get; set; }
    public List<string>? ExistingPhotos { get; set; }
}
