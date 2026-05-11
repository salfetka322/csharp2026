class CounterState
{
    private readonly object _locker = new object();
    private int _counter;
    private bool _isPaused;
    private bool _isRunning = true;
    private ConsoleColor _color = ConsoleColor.White;

    public int Counter
    {
        get
        {
            lock (_locker)
            {
                return _counter;
            }
        }
    }

    public bool IsPaused
    {
        get
        {
            lock (_locker)
            {
                return _isPaused;
            }
        }
    }

    public bool IsRunning
    {
        get
        {
            lock (_locker)
            {
                return _isRunning;
            }
        }
    }

    public ConsoleColor Color
    {
        get
        {
            lock (_locker)
            {
                return _color;
            }
        }
    }

    public int Increment()
    {
        lock (_locker)
        {
            _counter++;
            return _counter;
        }
    }

    public void TogglePause()
    {
        lock (_locker)
        {
            _isPaused = !_isPaused;
        }
    }

    public void Reset()
    {
        lock (_locker)
        {
            _counter = 0;
        }
    }

    public void Stop()
    {
        lock (_locker)
        {
            _isRunning = false;
        }
    }

    public void ChangeColor()
    {
        lock (_locker)
        {
            _color = _color switch
            {
                ConsoleColor.White => ConsoleColor.Green,
                ConsoleColor.Green => ConsoleColor.Yellow,
                ConsoleColor.Yellow => ConsoleColor.Cyan,
                ConsoleColor.Cyan => ConsoleColor.Magenta,
                _ => ConsoleColor.White
            };
        }
    }
}
