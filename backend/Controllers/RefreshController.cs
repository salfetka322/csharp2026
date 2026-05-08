using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loomi.Backend.Controllers;

[ApiController]
[Route("api")]
public sealed class RefreshController(AuthService authService, LoomiDbContext db) : ControllerBase
{
    [Authorize]
    [HttpGet("refresh")]
    public async Task<ActionResult<AuthResponse>> Refresh()
    {
        var user = await CurrentUser.Resolve(HttpContext, db) ?? throw new BadCredentialsException("User not authenticated");
        return Ok(authService.Refresh(user));
    }
}
