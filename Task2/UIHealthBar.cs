using System;

public class UIHealthBar
{
    public void UpdateHealthBar(int damage, int currentHp)
    {
        Console.WriteLine($"[UI] Поточне HP гравця: {currentHp}");
    }
}