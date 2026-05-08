using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Mapping;
using Loomi.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loomi.Backend.Controllers;

[Authorize]
[ApiController]
[Route("api/matches")]
public sealed class MatchController(MatchService matchService, LoomiDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProfileDto>>> GetMatches()
    {
        var user = await CurrentUser.Resolve(HttpContext, db) ?? throw new ResourceNotFoundException("User not authenticated");
        var matches = await matchService.GetMatchesFor(user);
        return Ok(matches.Select(ProfileMapper.ToDto).ToList());
    }
}
