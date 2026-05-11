class LargestFileFinder
{
    private readonly EnumerationOptions _options = new EnumerationOptions
    {
        RecurseSubdirectories = true,
        IgnoreInaccessible = true
    };

    public FileInfo? Find(string path)
    {
        DirectoryInfo directory = new DirectoryInfo(path);

        if (!directory.Exists)
        {
            throw new DirectoryNotFoundException("Папку не знайдено: " + path);
        }

        FileInfo? largestFile = null;

        foreach (FileInfo file in directory.EnumerateFiles("*", _options))
        {
            if (largestFile == null || file.Length > largestFile.Length)
            {
                largestFile = file;
            }
        }

        return largestFile;
    }
}
