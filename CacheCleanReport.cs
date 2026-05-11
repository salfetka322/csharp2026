class CacheCleanReport
{
    public int DeletedFiles { get; }
    public long TotalSize { get; }

    public CacheCleanReport(int deletedFiles, long totalSize)
    {
        DeletedFiles = deletedFiles;
        TotalSize = totalSize;
    }
}
