class Program
{
    static void Main()
    {
        CounterState state = new CounterState();
        CounterWorker counterWorker = new CounterWorker(state);
        KeyboardWorker keyboardWorker = new KeyboardWorker(state);

        CounterApplication application = new CounterApplication(counterWorker, keyboardWorker);
        application.Run();
    }
}
