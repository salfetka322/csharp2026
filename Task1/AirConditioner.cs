using System;

public class AirConditioner
{
    public void ReactToTemperature(double temperature)
    {
        if (temperature < 17)
        {
            Console.WriteLine("[Кондиціонер] Увімкнено обігрів");
        }
        else if (temperature <= 25)
        {
            Console.WriteLine("[Кондиціонер] Вимкнений");
        }
        else
        {
            Console.WriteLine("[Кондиціонер] Увімкнено охолодження");
        }
    }
}