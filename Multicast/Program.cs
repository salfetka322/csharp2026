using System;

class Program
{
    delegate void NotificationHandler(string message);

    static void SendEmail(string message)
    {
        Console.WriteLine("Email sent: " + message);
    }

    static void SendSMS(string message)
    {
        Console.WriteLine("SMS sent: " + message);
    }

    static void Main()
    {
        NotificationHandler notify;

        notify = SendEmail;
        notify += SendSMS;

        notify("Hello!");
    }
}