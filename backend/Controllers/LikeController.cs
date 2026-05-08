using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loomi.Backend.Controllers;

[Authorize]
[ApiController]
[Route("api/likes")]
public sealed class LikeController(LikeService likeService, LoomiDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<LikeDto>> Like([FromBody] LikeDto request)
    {
        var user = await CurrentUser.Resolve(HttpContext, db) ?? throw new ResourceNotFoundException("User not authenticated");
        if (request.ToProfileId is null)
        {
            throw new ArgumentException("Profile ID is required");
        }

        var response = await likeService.Like(user, request.ToProfileId.Value);
        return StatusCode(StatusCodes.Status201Created, response);
    }
}
