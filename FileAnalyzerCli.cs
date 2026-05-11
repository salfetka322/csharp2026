class FileAnalyzerCli
{
    private readonly DirectoryAnalyzer _directoryAnalyzer;

    public FileAnalyzerCli(DirectoryAnalyzer directoryAnalyzer)
    {
        _directoryAnalyzer = directoryAnalyzer;
    }

    public void Run(string path)
    {
        try
        {
            DirectoryReport report = _directoryAnalyzer.Analyze(path);

            Console.WriteLine("Folders: " + report.Folders);
            Console.WriteLine("Files: " + report.Files);
            Console.WriteLine("Total size: " + SizeFormatter.Format(report.TotalSize));
            Console.WriteLine("Largest file: " + (report.LargestFile?.Name ?? "not found"));
        }
        catch (Exception exception)
        {
            Console.WriteLine("Error: " + exception.Message);
        }
    }
}
