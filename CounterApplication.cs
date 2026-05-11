class CounterApplication
{
    private readonly CounterWorker _counterWorker;
    private readonly KeyboardWorker _keyboardWorker;

    public CounterApplication(CounterWorker counterWorker, KeyboardWorker keyboardWorker)
    {
        _counterWorker = counterWorker;
        _keyboardWorker = keyboardWorker;
    }

    public void Run()
    {
        Console.WriteLine("Binds: P - pause/resume, R - reset, C - change color, Q - quit");

        Thread keyboardThread = new Thread(_keyboardWorker.Run)
        {
            IsBackground = true
        };

        keyboardThread.Start();
        _counterWorker.Run();
        keyboardThread.Join();
    }
}
