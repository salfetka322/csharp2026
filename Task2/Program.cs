class Program
{
    static void Main()
    {
        StudentDemo demo = new StudentDemo(new StudentJsonStorage("students.json"));
        demo.Run();
    }
}
