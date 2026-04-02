using System;
using System.IO;
using Task2.Publishers;

namespace Task2.Loggers
{
    public class FileLogger
    {
        private readonly string _filePath;

        public FileLogger(string filePath, MessagePublisher publisher)
        {
            _filePath = filePath;
            publisher.MessageSent += OnMessageSent;
        }

        private void OnMessageSent(string message)
        {
            string logMessage = $"[{DateTime.Now:HH:mm:ss}] {message}{Environment.NewLine}";
            File.AppendAllText(_filePath, logMessage);
        }
    }
}