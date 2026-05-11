class Application
{
    private readonly TextFileAnalyzer _textFileAnalyzer;
    private readonly FolderInspector _folderInspector;
    private readonly LargestFileFinder _largestFileFinder;
    private readonly CacheCleaner _cacheCleaner;
    private readonly FileAnalyzerCli _fileAnalyzerCli;

    public Application(
        TextFileAnalyzer textFileAnalyzer,
        FolderInspector folderInspector,
        LargestFileFinder largestFileFinder,
        CacheCleaner cacheCleaner,
        FileAnalyzerCli fileAnalyzerCli)
    {
        _textFileAnalyzer = textFileAnalyzer;
        _folderInspector = folderInspector;
        _largestFileFinder = largestFileFinder;
        _cacheCleaner = cacheCleaner;
        _fileAnalyzerCli = fileAnalyzerCli;
    }

    public void Run()
    {
        while (true)
        {
            Console.WriteLine();
            Console.WriteLine("Практична робота №3");
            Console.WriteLine("1. Аналізатор текстового файлу");
            Console.WriteLine("2. Інспектор папки");
            Console.WriteLine("3. Пошук найбільшого файлу");
            Console.WriteLine("4. Очищення кешу");
            Console.WriteLine("5. File Analyzer CLI");
            Console.WriteLine("0. Вихід");
            Console.Write("Оберіть завдання: ");

            string? choice = Console.ReadLine();
            Console.WriteLine();

            switch (choice)
            {
                case "1":
                    RunTextAnalyzer();
                    break;
                case "2":
                    RunFolderInspector();
                    break;
                case "3":
                    RunLargestFileFinder();
                    break;
                case "4":
                    RunCacheCleaner();
                    break;
                case "5":
                    RunFileAnalyzerCli();
                    break;
                case "0":
                    return;
                default:
                    Console.WriteLine("Невірний пункт меню.");
                    break;
            }
        }
    }

    private void RunTextAnalyzer()
    {
        Console.Write("Шлях до story.txt (Enter = story.txt): ");
        string inputPath = ReadPathOrDefault("story.txt");

        Console.Write("Шлях до report.txt (Enter = report.txt): ");
        string reportPath = ReadPathOrDefault("report.txt");

        try
        {
            TextReport report = _textFileAnalyzer.Analyze(inputPath);
            _textFileAnalyzer.WriteReport(report, reportPath);

            Console.WriteLine("Звіт записано у файл: " + Path.GetFullPath(reportPath));
            Console.WriteLine(report);
        }
        catch (Exception exception)
        {
            Console.WriteLine("Помилка: " + exception.Message);
        }
    }

    private void RunFolderInspector()
    {
        string path = ReadRequiredPath("Введіть шлях до папки: ");

        try
        {
            _folderInspector.Print(path);
        }
        catch (Exception exception)
        {
            Console.WriteLine("Помилка: " + exception.Message);
        }
    }

    private void RunLargestFileFinder()
    {
        string path = ReadRequiredPath("Введіть шлях до папки: ");

        try
        {
            FileInfo? file = _largestFileFinder.Find(path);

            if (file == null)
            {
                Console.WriteLine("Файли не знайдено.");
                return;
            }

            Console.WriteLine("Name: " + file.Name);
            Console.WriteLine("Size: " + SizeFormatter.Format(file.Length));
            Console.WriteLine("Path: " + file.FullName);
        }
        catch (Exception exception)
        {
            Console.WriteLine("Помилка: " + exception.Message);
        }
    }

    private void RunCacheCleaner()
    {
        string path = ReadRequiredPath("Введіть шлях до папки cache: ");
        Console.WriteLine("1. Рекурсивно");
        Console.WriteLine("2. Без рекурсії");
        Console.Write("Оберіть варіант: ");
        string? mode = Console.ReadLine();

        try
        {
            CacheCleanReport report = mode == "1"
                ? _cacheCleaner.CleanRecursive(path)
                : _cacheCleaner.CleanWithoutRecursion(path);

            Console.WriteLine("Deleted files: " + report.DeletedFiles);
            Console.WriteLine("Total size: " + SizeFormatter.Format(report.TotalSize));
        }
        catch (Exception exception)
        {
            Console.WriteLine("Помилка: " + exception.Message);
        }
    }

    private void RunFileAnalyzerCli()
    {
        string path = ReadRequiredPath("Введіть шлях до папки: ");
        _fileAnalyzerCli.Run(path);
    }

    private static string ReadRequiredPath(string message)
    {
        while (true)
        {
            Console.Write(message);
            string? path = Console.ReadLine();

            if (!string.IsNullOrWhiteSpace(path))
            {
                return path.Trim();
            }

            Console.WriteLine("Шлях не може бути порожнім.");
        }
    }

    private static string ReadPathOrDefault(string defaultPath)
    {
        string? path = Console.ReadLine();
        return string.IsNullOrWhiteSpace(path) ? defaultPath : path.Trim();
    }
}
