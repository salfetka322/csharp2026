class CounterWorker
{
    private readonly CounterState _state;

    public CounterWorker(CounterState state)
    {
        _state = state;
    }

    public void Run()
    {
        while (_state.IsRunning)
        {
            if (!_state.IsPaused)
            {
                int value = _state.Increment();
                Console.ForegroundColor = _state.Color;
                Console.WriteLine("Counter: " + value);
                Console.ResetColor();
            }

            Thread.Sleep(1000);
        }
    }
}
