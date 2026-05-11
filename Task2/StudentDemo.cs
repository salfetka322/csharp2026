class StudentDemo
{
    private readonly StudentJsonStorage _storage;

    public StudentDemo(StudentJsonStorage storage)
    {
        _storage = storage;
    }

    public void Run()
    {
        List<Student> students = new List<Student>
        {
            new Student { Name = "Anna", Age = 18, AverageScore = 91.5 },
            new Student { Name = "Ivan", Age = 19, AverageScore = 84.2 },
            new Student { Name = "Maria", Age = 18, AverageScore = 95.1 },
            new Student { Name = "Oleh", Age = 20, AverageScore = 78.6 },
            new Student { Name = "Sofia", Age = 19, AverageScore = 88.9 }
        };

        _storage.Save(students);
        List<Student> loadedStudents = _storage.Load();

        foreach (Student student in loadedStudents)
        {
            Console.WriteLine($"{student.Name}, Age: {student.Age}, Average score: {student.AverageScore}");
        }
    }
}
