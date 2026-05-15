using Loomi.Backend.Data;
using Loomi.Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Repositories;

public sealed class UserRepository(LoomiDbContext db) : IUserRepository
{
    public Task<bool> ExistsByEmail(string email)
    {
        return db.Users.AnyAsync(x => x.Email == email);
    }

    public Task<User?> GetByEmail(string email)
    {
        return db.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public void Add(User user)
    {
        db.Users.Add(user);
    }

    public Task SaveChangesAsync()
    {
        return db.SaveChangesAsync();
    }
}
