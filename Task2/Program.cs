using System;

class Program
{
    static void Main()
    {
        Player player = new Player(100);

        UIHealthBar uiHealthBar = new UIHealthBar();
        SoundSystem soundSystem = new SoundSystem();
        AchievementSystem achievementSystem = new AchievementSystem();
        GameLogger gameLogger = new GameLogger();

        player.DamageTaken += uiHealthBar.UpdateHealthBar;
        player.DamageTaken += soundSystem.PlaySound;
        player.DamageTaken += achievementSystem.CheckAchievements;
        player.DamageTaken += gameLogger.LogDamage;

        player.TakeDamage(10);
        player.TakeDamage(25);
        player.TakeDamage(20);
        player.TakeDamage(30);
        player.TakeDamage(20);
    }
}