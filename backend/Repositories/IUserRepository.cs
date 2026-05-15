using Loomi.Backend.Entities;

namespace Loomi.Backend.Repositories;

public interface IUserRepository
{
    Task<bool> ExistsByEmail(string email);
    Task<User?> GetByEmail(string email);
    void Add(User user);
    Task SaveChangesAsync();
}
