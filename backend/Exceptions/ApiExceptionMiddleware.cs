using System.Net;
using System.Text.Json;
using Loomi.Backend.Dtos;

namespace Loomi.Backend.Exceptions;

public sealed class ApiExceptionMiddleware(RequestDelegate next, ILogger<ApiExceptionMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            await HandleException(context, exception);
        }
    }

    private async Task HandleException(HttpContext context, Exception exception)
    {
        var (status, error, message) = exception switch
        {
            ResourceNotFoundException => (HttpStatusCode.NotFound, "Not Found", exception.Message),
            ResourceAlreadyExistsException => (HttpStatusCode.Conflict, "Conflict", exception.Message),
            BadCredentialsException => (HttpStatusCode.Unauthorized, "Unauthorized", exception.Message),
            FileStorageException => (HttpStatusCode.InternalServerError, "File Storage Error", exception.Message),
            ArgumentException => (HttpStatusCode.BadRequest, "Bad Request", exception.Message),
            _ => (HttpStatusCode.InternalServerError, "Internal Server Error", "An unexpected error occurred")
        };

        if (status == HttpStatusCode.InternalServerError)
        {
            logger.LogError(exception, "Unhandled API error");
        }
        else
        {
            logger.LogWarning(exception, "API error: {Message}", exception.Message);
        }

        context.Response.StatusCode = (int)status;
        context.Response.ContentType = "application/json";

        var payload = new ErrorResponse
        {
            Status = (int)status,
            Error = error,
            Message = message,
            Path = context.Request.Path.Value ?? string.Empty
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(payload, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        }));
    }
}
