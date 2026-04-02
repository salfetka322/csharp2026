using System;
using System.Linq;

namespace Task1.Operations
{
    public static class TextOperations
    {
        public static string ToUpperCase(string input)
        {
            return input.ToUpper();
        }

        public static string CountCharacters(string input)
        {
            return $"Characters: {input.Length}";
        }

        public static string CountWords(string input)
        {
            int wordCount = input
                .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Length;

            return $"Words: {wordCount}";
        }
    }
}