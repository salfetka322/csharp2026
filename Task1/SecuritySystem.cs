using System;

public class SecuritySystem
{
    public void CheckTemperature(double temperature)
    {
        if (temperature > 40)
        {
            Console.WriteLine("[Безпека] УВАГА: Перегрів!");
        }
        else if (temperature < 5)
        {
            Console.WriteLine("[Безпека] УВАГА: Ризик замерзання!");
        }
    }
}