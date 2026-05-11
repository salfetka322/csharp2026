class DirectoryAnalyzer
{
    private readonly EnumerationOptions _options = new EnumerationOptions
    {
        RecurseSubdirectories = true,
        IgnoreInaccessible = true
    };

    public DirectoryReport Analyze(string path)
    {
        DirectoryInfo directory = new DirectoryInfo(path);

        if (!directory.Exists)
        {
            throw new DirectoryNotFoundException("Папку не знайдено: " + path);
        }

        int folderCount = 0;
        int fileCount = 0;
        long totalSize = 0;
        FileInfo? largestFile = null;

        foreach (DirectoryInfo _ in directory.EnumerateDirectories("*", _options))
        {
            folderCount++;
        }

        foreach (FileInfo file in directory.EnumerateFiles("*", _options))
        {
            fileCount++;
            totalSize += file.Length;

            if (largestFile == null || file.Length > largestFile.Length)
            {
                largestFile = file;
            }
        }

        return new DirectoryReport(folderCount, fileCount, totalSize, largestFile);
    }
}
