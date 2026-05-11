class Program
{
    static void Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        FileAnalyzerCli cli = new FileAnalyzerCli(new DirectoryAnalyzer());

        if (args.Length > 0)
        {
            cli.Run(args[0]);
            return;
        }

        Application app = new Application(
            new TextFileAnalyzer(),
            new FolderInspector(),
            new LargestFileFinder(),
            new CacheCleaner(),
            cli);

        app.Run();
    }
}
