class DirectoryReport
{
    public int Folders { get; }
    public int Files { get; }
    public long TotalSize { get; }
    public FileInfo? LargestFile { get; }

    public DirectoryReport(int folders, int files, long totalSize, FileInfo? largestFile)
    {
        Folders = folders;
        Files = files;
        TotalSize = totalSize;
        LargestFile = largestFile;
    }
}
