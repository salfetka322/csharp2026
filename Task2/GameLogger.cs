using System;

public class GameLogger
{
    public void LogDamage(int damage, int currentHp)
    {
        Console.WriteLine($"[Лог] Гравець отримав {damage} урону. Поточне HP: {currentHp}");
    }
}