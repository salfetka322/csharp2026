using Practical5.Data.Interfaces;
using Practical5.Data.Models;
using Practical5.Data.Repositories;
using Practical5.Data.Serialization;
using Practical5.Data.Services;

class Program
{
    static async Task Main()
    {
        string dataDirectory = Path.Combine(AppContext.BaseDirectory, "data");

        IDataSerializer serializer = new JsonDataSerializer();

        IRepository<User> userRepository = new JsonFileRepository<User>(serializer, dataDirectory);
        IRepository<Book> bookRepository = new JsonFileRepository<Book>(serializer, dataDirectory);
        IRepository<Order> orderRepository = new JsonFileRepository<Order>(serializer, dataDirectory);

        UserService userService = new UserService(userRepository);
        BookService bookService = new BookService(bookRepository);
        OrderService orderService = new OrderService(orderRepository);

        ConsoleDemo demo = new ConsoleDemo(userService, bookService, orderService);
        await demo.RunAsync();
    }
}

class ConsoleDemo
{
    private readonly UserService _userService;
    private readonly BookService _bookService;
    private readonly OrderService _orderService;

    public ConsoleDemo(UserService userService, BookService bookService, OrderService orderService)
    {
        _userService = userService;
        _bookService = bookService;
        _orderService = orderService;
    }

    public async Task RunAsync()
    {
        User user = new User
        {
            Name = "Anna",
            Email = "anna@example.com"
        };

        Book book = new Book
        {
            Title = "Clean Code",
            Author = "Robert Martin",
            Year = 2008
        };

        await _userService.AddAsync(user);
        await _bookService.AddAsync(book);

        Order order = new Order
        {
            UserId = user.Id,
            BookId = book.Id,
            Status = "Created"
        };

        await _orderService.AddAsync(order);

        List<User> users = await _userService.GetAllAsync();
        List<Book> books = _bookService.GetAll();
        List<Order> orders = await _orderService.GetAllAsync();

        Console.WriteLine("Users: " + users.Count);
        Console.WriteLine("Books: " + books.Count);
        Console.WriteLine("Orders: " + orders.Count);
    }
}
