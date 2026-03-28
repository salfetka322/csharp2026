using System;

public class SoundSystem
{
    public void PlaySound(int damage, int currentHp)
    {
        Console.WriteLine("[Звук] Відтворено звук отримання урону");

        if (currentHp <= 20 && currentHp > 0)
        {
            Console.WriteLine("[Звук] Відтворено звук критичного стану");
        }
    }
}