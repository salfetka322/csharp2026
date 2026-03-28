using System;

public class AchievementSystem
{
    private bool _halfHealthUnlocked = false;
    private bool _firstDeathUnlocked = false;

    public void CheckAchievements(int damage, int currentHp)
    {
        if (!_halfHealthUnlocked && currentHp <= 50 && currentHp > 0)
        {
            _halfHealthUnlocked = true;
            Console.WriteLine("[Досягнення] Відкрито досягнення: Half Health");
        }

        if (!_firstDeathUnlocked && currentHp <= 0)
        {
            _firstDeathUnlocked = true;
            Console.WriteLine("[Досягнення] Відкрито досягнення: First Death");
        }
    }
}