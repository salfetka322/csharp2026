using System;

class Program
{
    delegate bool Validator(string text);

    static Validator GetValidator(int minLength)
    {
        return text => text.Length >= minLength;
    }

    static void Main()
    {
        Validator passwordValidator = GetValidator(8);
        Validator loginValidator = GetValidator(3);

        Console.Write("Введіть логін: ");
        string login = Console.ReadLine();

        Console.Write("Введіть пароль: ");
        string password = Console.ReadLine();

        Console.WriteLine();
        Console.WriteLine("Перевірка логіна: " + loginValidator(login));
        Console.WriteLine("Перевірка пароля: " + passwordValidator(password));
    }
}