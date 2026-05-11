class Program
{
    static void Main()
    {
        JsonErrorDemo demo = new JsonErrorDemo("broken_tasks.json");
        demo.Run();
    }
}
