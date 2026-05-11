class Program
{
    static void Main()
    {
        TaskTracker tracker = new TaskTracker(new TaskStorage("tasks.json"));
        tracker.Run();
    }
}
