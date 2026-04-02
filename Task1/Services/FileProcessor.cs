using System;
using System.IO;
using Task1.Delegates;

namespace Task1.Services
{
    public class FileProcessor
    {
        public void ProcessFile(string inputPath, string outputPath, TextOperation operation, string operationName)
        {
            if (!File.Exists(inputPath))
            {
                throw new FileNotFoundException($"Input file not found: {inputPath}");
            }

            var lines = File.ReadAllLines(inputPath);

            File.AppendAllText(outputPath, $"{operationName} {Environment.NewLine}");

            foreach (var line in lines)
            {
                string result = operation(line);
                File.AppendAllText(outputPath, result + Environment.NewLine);
            }

            File.AppendAllText(outputPath, Environment.NewLine);
        }
    }
}