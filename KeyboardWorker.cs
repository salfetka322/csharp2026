class KeyboardWorker
{
    private readonly CounterState _state;

    public KeyboardWorker(CounterState state)
    {
        _state = state;
    }

    public void Run()
    {
        while (_state.IsRunning)
        {
            ConsoleKeyInfo keyInfo = Console.ReadKey(true);

            switch (keyInfo.Key)
            {
                case ConsoleKey.P:
                    _state.TogglePause();
                    Console.WriteLine(_state.IsPaused ? "Paused" : "Resumed");
                    break;
                case ConsoleKey.R:
                    _state.Reset();
                    Console.WriteLine("Counter reset");
                    break;
                case ConsoleKey.C:
                    _state.ChangeColor();
                    Console.WriteLine("Color changed");
                    break;
                case ConsoleKey.Q:
                    _state.Stop();
                    Console.WriteLine("Program stopped");
                    break;
            }
        }
    }
}
