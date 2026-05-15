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
[Route("api/recommendations")]
public sealed class RecommendationController(ProfileService profileService, IUserRepository users) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProfileDto>>> GetRecommendations([FromQuery] int limit = 10)
    {
        if (limit is < 1 or > 50)
        {
            limit = 10;
        }

        var user = await CurrentUser.Resolve(HttpContext, users) ?? throw new ResourceNotFoundException("User not authenticated");
        var profile = await profileService.GetByUser(user)
            ?? throw new ResourceNotFoundException("Profile not found. Please create your profile first.");
        var recommendations = await profileService.GetRecommendationsFor(profile, limit);
        return Ok(recommendations.Select(ProfileMapper.ToDto).ToList());
    }
}
