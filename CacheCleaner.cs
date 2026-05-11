class CacheCleaner
{
    public CacheCleanReport CleanRecursive(string path)
    {
        DirectoryInfo directory = GetExistingDirectory(path);
        return CleanRecursive(directory);
    }

    public CacheCleanReport CleanWithoutRecursion(string path)
    {
        DirectoryInfo directory = GetExistingDirectory(path);
        Stack<DirectoryInfo> directories = new Stack<DirectoryInfo>();
        directories.Push(directory);

        int deletedFiles = 0;
        long totalSize = 0;

        while (directories.Count > 0)
        {
            DirectoryInfo current = directories.Pop();

            foreach (FileInfo file in current.GetFiles())
            {
                totalSize += file.Length;
                file.Delete();
                deletedFiles++;
            }

            foreach (DirectoryInfo subdirectory in current.GetDirectories())
            {
                directories.Push(subdirectory);
            }
        }

        return new CacheCleanReport(deletedFiles, totalSize);
    }

    private CacheCleanReport CleanRecursive(DirectoryInfo directory)
    {
        int deletedFiles = 0;
        long totalSize = 0;

        foreach (FileInfo file in directory.GetFiles())
        {
            totalSize += file.Length;
            file.Delete();
            deletedFiles++;
        }

        foreach (DirectoryInfo subdirectory in directory.GetDirectories())
        {
            CacheCleanReport report = CleanRecursive(subdirectory);
            deletedFiles += report.DeletedFiles;
            totalSize += report.TotalSize;
        }

        return new CacheCleanReport(deletedFiles, totalSize);
    }

    private static DirectoryInfo GetExistingDirectory(string path)
    {
        DirectoryInfo directory = new DirectoryInfo(path);

        if (!directory.Exists)
        {
            throw new DirectoryNotFoundException("Папку не знайдено: " + path);
        }

        return directory;
    }
}
