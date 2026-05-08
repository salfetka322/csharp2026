using Loomi.Backend.Exceptions;

namespace Loomi.Backend.Services;

public sealed class FileStorageService(IConfiguration configuration, ILogger<FileStorageService> logger)
{
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".gif", ".webp"
    };

    private const long MaxFileSize = 10 * 1024 * 1024;

    public async Task<List<string>> SaveFiles(IFormFileCollection? files)
    {
        var urls = new List<string>();
        if (files is null || files.Count == 0)
        {
            return urls;
        }

        var uploadDir = Environment.GetEnvironmentVariable("UPLOAD_DIR") ?? configuration["UploadDir"] ?? "uploads";
        Directory.CreateDirectory(uploadDir);

        foreach (var file in files)
        {
            if (!IsValidImage(file))
            {
                logger.LogWarning("Skipping invalid file {FileName}", file.FileName);
                continue;
            }

            try
            {
                var extension = Path.GetExtension(file.FileName);
                var fileName = $"{Guid.NewGuid():N}{extension}";
                var filePath = Path.Combine(uploadDir, fileName);
                await using var stream = File.Create(filePath);
                await file.CopyToAsync(stream);
                urls.Add($"/uploads/{fileName}");
            }
            catch (Exception ex)
            {
                throw new FileStorageException("Failed to save files", ex);
            }
        }

        return urls;
    }

    private static bool IsValidImage(IFormFile file)
    {
        if (file.Length <= 0 || file.Length > MaxFileSize)
        {
            return false;
        }

        var extension = Path.GetExtension(file.FileName);
        return AllowedExtensions.Contains(extension) && file.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase);
    }
}
