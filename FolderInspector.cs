class FolderInspector
{
    public void Print(string path)
    {
        DirectoryInfo directory = new DirectoryInfo(path);

        if (!directory.Exists)
        {
            throw new DirectoryNotFoundException("Папку не знайдено: " + path);
        }

        Console.WriteLine("Files:");
        foreach (FileInfo file in directory.GetFiles())
        {
            Console.WriteLine("- " + file.Name);
            Console.WriteLine("  Size: " + SizeFormatter.Format(file.Length));
            Console.WriteLine("  Created: " + file.CreationTime);
        }

        Console.WriteLine();
        Console.WriteLine("Subfolders:");
        foreach (DirectoryInfo subdirectory in directory.GetDirectories())
        {
            Console.WriteLine("- " + subdirectory.Name);
        }
    }
}
