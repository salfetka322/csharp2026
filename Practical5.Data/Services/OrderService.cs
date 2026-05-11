using Practical5.Data.Interfaces;
using Practical5.Data.Models;

namespace Practical5.Data.Services;

public class OrderService : BaseService<Order>
{
    public OrderService(IRepository<Order> repository) : base(repository)
    {
    }

    public List<Order> GetUserOrders(Guid userId)
    {
        return GetAll()
            .Where(order => order.UserId == userId)
            .ToList();
    }
}
