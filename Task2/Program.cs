using System;
using System.IO;
using Task2.Loggers;
using Task2.Publishers;

namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string projectPath = Directory.GetParent(AppDomain.CurrentDomain.BaseDirectory)!.Parent!.Parent!.Parent!.FullName;
            string logFilePath = Path.Combine(projectPath, "logPD24.txt");

            File.WriteAllText(logFilePath, string.Empty);

            var publisher = new MessagePublisher();
            var logger = new FileLogger(logFilePath, publisher);

            Console.WriteLine("Input 4 lines of words:");

            for (int i = 0; i < 4; i++)
            {
                Console.Write($"Line {i + 1}: ");
                string? input = Console.ReadLine();

                if (!string.IsNullOrWhiteSpace(input))
                {
                    publisher.Send(input);
                }
                else
                {
                    publisher.Send("(Empty message)");
                }
            }

            Console.WriteLine("All messages in file.");
        }
    }
}