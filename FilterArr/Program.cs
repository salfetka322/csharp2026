using System;

class Program
{
    delegate bool FilterPredicate(int number);

    static void FilterArray(int[] numbers, FilterPredicate predicate)
    {
        foreach (int number in numbers)
        {
            if (predicate(number))
            {
                Console.WriteLine(number);
            }
        }
    }

    static bool IsEven(int number)
    {
        return number % 2 == 0;
    }

    static bool IsGreaterThanFive(int number)
    {
        return number > 5;
    }

    static void Main()
    {
        int[] numbers = {1,2,3,4,5,6,7,8,9,10};

        Console.WriteLine("Even numbers:");
        FilterArray(numbers, IsEven);

        Console.WriteLine("\nGreater than 5:");
        FilterArray(numbers, IsGreaterThanFive);

        Console.WriteLine("\nOdd numbers (lambda):");
        FilterArray(numbers, n => n % 2 != 0);
    }
}