class TaskTracker
{
    private readonly TaskStorage _storage;
    private List<TaskItem> _tasks = new List<TaskItem>();

    public TaskTracker(TaskStorage storage)
    {
        _storage = storage;
    }

    public void Run()
    {
        _tasks = _storage.Load();

        while (true)
        {
            Console.WriteLine();
            Console.WriteLine("Task Tracker");
            Console.WriteLine("1. Додати задачу");
            Console.WriteLine("2. Змінити статус задачі");
            Console.WriteLine("3. Переглянути список задач");
            Console.WriteLine("0. Вийти");
            Console.Write("Оберіть дію: ");

            string? choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    AddTask();
                    break;
                case "2":
                    ChangeStatus();
                    break;
                case "3":
                    PrintTasks();
                    break;
                case "0":
                    _storage.Save(_tasks);
                    Console.WriteLine("Задачі збережено у tasks.json");
                    return;
                default:
                    Console.WriteLine("Невірний вибір.");
                    break;
            }
        }
    }

    private void AddTask()
    {
        Console.Write("Назва задачі: ");
        string? title = Console.ReadLine();

        if (string.IsNullOrWhiteSpace(title))
        {
            Console.WriteLine("Назва не може бути порожньою.");
            return;
        }

        _tasks.Add(new TaskItem { Title = title.Trim(), IsCompleted = false });
    }

    private void ChangeStatus()
    {
        PrintTasks();
        Console.Write("Номер задачі: ");

        if (!int.TryParse(Console.ReadLine(), out int number) || number < 1 || number > _tasks.Count)
        {
            Console.WriteLine("Невірний номер задачі.");
            return;
        }

        _tasks[number - 1].IsCompleted = !_tasks[number - 1].IsCompleted;
        Console.WriteLine("Статус змінено.");
    }

    private void PrintTasks()
    {
        if (_tasks.Count == 0)
        {
            Console.WriteLine("Список задач порожній.");
            return;
        }

        for (int i = 0; i < _tasks.Count; i++)
        {
            string status = _tasks[i].IsCompleted ? "Done" : "In progress";
            Console.WriteLine($"{i + 1}. {_tasks[i].Title} - {status}");
        }
    }
}
