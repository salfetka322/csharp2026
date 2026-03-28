using System;
using System.Collections.Generic;

class Program
{
    static double Add(double a, double b)
    {
        return a + b;
    }

    static double Subtract(double a, double b)
    {
        return a - b;
    }

    static double Multiply(double a, double b)
    {
        return a * b;
    }

    static double Divide(double a, double b)
    {
        if (b == 0)
        {
            Console.WriteLine("Помилка: ділення на нуль");
            return 0;
        }

        return a / b;
    }

    static void Main()
    {
        Func<double, double, double> operation;

        operation = Add;
        Console.WriteLine("Add: " + operation(10, 5));

        operation = Subtract;
        Console.WriteLine("Subtract: " + operation(10, 5));

        operation = Multiply;
        Console.WriteLine("Multiply: " + operation(10, 5));

        operation = Divide;
        Console.WriteLine("Divide: " + operation(10, 5));

        Console.WriteLine();

        List<string> students = new List<string>
        {
            "Anna",
            "Andrii",
            "Bohdan",
            "Olena",
            "Oksana",
            "Ivan"
        };

        List<string> namesStartingWithA = students.FindAll(name => name.StartsWith("A"));

        Console.WriteLine("Names starting with A:");
        foreach (string name in namesStartingWithA)
        {
            Console.WriteLine(name);
        }
    }
}