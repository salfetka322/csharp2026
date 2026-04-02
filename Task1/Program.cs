using System;
using System.IO;
using Task1.Operations;
using Task1.Services;

namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string projectPath = Directory.GetParent(AppDomain.CurrentDomain.BaseDirectory)!.Parent!.Parent!.Parent!.FullName;

            string inputFile = Path.Combine(projectPath, "textPD24.txt");
            string outputFile = Path.Combine(projectPath, "resultPD24.txt");

            File.WriteAllText(outputFile, string.Empty);

            var processor = new FileProcessor();

            processor.ProcessFile(inputFile, outputFile, TextOperations.ToUpperCase, "uppercase");
            processor.ProcessFile(inputFile, outputFile, TextOperations.CountCharacters, "char count");
            processor.ProcessFile(inputFile, outputFile, TextOperations.CountWords, "word count");

        }
    }
}