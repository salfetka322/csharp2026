using System;

public class TemperatureSensor
{
    public event Action<double> TemperatureChanged;

    private double _temperature;

    public void SetTemperature(double newTemperature)
    {
        if (_temperature == newTemperature)
            return;

        _temperature = newTemperature;
        Console.WriteLine($"\n[Датчик] Температура змінена: {_temperature}°C");

        TemperatureChanged?.Invoke(_temperature);
    }
}