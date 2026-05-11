class TextFileAnalyzer
{
    public TextReport Analyze(string path)
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException("Файл не знайдено.", path);
        }

        int lines = 0;
        int words = 0;
        int characters = 0;

        using StreamReader reader = new StreamReader(path);

        while (!reader.EndOfStream)
        {
            string? line = reader.ReadLine();

            if (line == null)
            {
                continue;
            }

            lines++;
            characters += line.Length;
            words += CountWords(line);
        }

        return new TextReport(lines, words, characters);
    }

    public void WriteReport(TextReport report, string path)
    {
        using StreamWriter writer = new StreamWriter(path);
        writer.WriteLine("Text file report");
        writer.WriteLine("Lines: " + report.Lines);
        writer.WriteLine("Words: " + report.Words);
        writer.WriteLine("Characters: " + report.Characters);
    }

    private static int CountWords(string line)
    {
        char[] separators = { ' ', '\t', '\r', '\n' };
        return line.Split(separators, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}
