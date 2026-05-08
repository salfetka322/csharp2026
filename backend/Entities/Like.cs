namespace Loomi.Backend.Entities;

public sealed class Like
{
    public long Id { get; set; }
    public long FromProfileId { get; set; }
    public Profile FromProfile { get; set; } = null!;
    public long ToProfileId { get; set; }
    public Profile ToProfile { get; set; } = null!;
}
