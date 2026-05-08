using Loomi.Backend.Data;
using Loomi.Backend.Dtos;
using Loomi.Backend.Exceptions;
using Loomi.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loomi.Backend.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(AuthService authService, GoogleAuthService googleAuthService, LoomiDbContext db) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        var response = await authService.Register(request.Email, request.Password);
        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthRequest request)
    {
        return Ok(await authService.Login(request.Email, request.Password));
    }

    [Authorize]
    [HttpGet("refresh")]
    public async Task<ActionResult<AuthResponse>> Refresh()
    {
        var user = await CurrentUser.Resolve(HttpContext, db) ?? throw new BadCredentialsException("User not authenticated");
        return Ok(authService.Refresh(user));
    }

    [HttpPost("logout")]
    public IActionResult Logout() => Ok();

    [HttpPost("google")]
    public async Task<ActionResult<AuthResponse>> Google([FromBody] GoogleAuthRequest request)
    {
        return Ok(await googleAuthService.AuthenticateWithGoogle(request.IdToken));
    }
}
