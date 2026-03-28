using System;

class Program
{
    delegate double MathOperation(double a, double b);

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
        return a / b;
    }

    static void Main()
    {
        MathOperation operation;

        operation = Add;
        Console.WriteLine("Add: " + operation(10, 5));

        operation = Subtract;
        Console.WriteLine("Subtract: " + operation(10, 5));

        operation = Multiply;
        Console.WriteLine("Multiply: " + operation(10, 5));

        operation = Divide;
        Console.WriteLine("Divide: " + operation(10, 5));
    }
}