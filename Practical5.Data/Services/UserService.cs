using Practical5.Data.Interfaces;
using Practical5.Data.Models;

namespace Practical5.Data.Services;

public class UserService : BaseService<User>
{
    public UserService(IRepository<User> repository) : base(repository)
    {
    }

    public User? FindByEmail(string email)
    {
        return GetAll().FirstOrDefault(user => user.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
    }
}
