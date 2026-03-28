using System;

class Logger
{
    public Action<string> LogHandler;

    public void Log(string message)
    {
        if (LogHandler != null)
        {
            LogHandler(message);
        }
    }
}

class Program
{
    static void Main()
    {
        Logger logger = new Logger();

        logger.LogHandler = message => Console.WriteLine(message);
        logger.Log("Hello world");

        logger.LogHandler = message => Console.WriteLine(message.ToUpper());
        logger.Log("Hello again");
    }
}