using Practical5.Data.Interfaces;
using Practical5.Data.Models;

namespace Practical5.Data.Services;

public class BookService : BaseService<Book>
{
    public BookService(IRepository<Book> repository) : base(repository)
    {
    }

    public List<Book> FindByAuthor(string author)
    {
        return GetAll()
            .Where(book => book.Author.Equals(author, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
}
