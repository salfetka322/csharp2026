using System;

public class Player
{
    public event Action<int, int> DamageTaken;

    public int HP { get; private set; }

    public Player(int hp)
    {
        HP = hp;
    }

    public void TakeDamage(int damage)
    {
        if (HP <= 0)
        {
            Console.WriteLine("[Гравець] Гравець уже мертвий.");
            return;
        }

        HP -= damage;

        if (HP < 0)
            HP = 0;

        Console.WriteLine($"\n[Гравець] Отримано урон: {damage}");

        DamageTaken?.Invoke(damage, HP);
    }
}