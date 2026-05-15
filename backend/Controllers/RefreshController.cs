using Loomi.Backend.Dtos;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Repositories;
using Loomi.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loomi.Backend.Controllers;

[ApiController]
[Route("api")]
public sealed class RefreshController(AuthService authService, IUserRepository users) : ControllerBase
{
    [Authorize]
    [HttpGet("refresh")]
    public async Task<ActionResult<AuthResponse>> Refresh()
    {
        var user = await CurrentUser.Resolve(HttpContext, users) ?? throw new BadCredentialsException("User not authenticated");
        return Ok(authService.Refresh(user));
    }
}
