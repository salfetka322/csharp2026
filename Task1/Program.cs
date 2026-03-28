using System;

class Program
{
    static void Main()
    {
        TemperatureSensor sensor = new TemperatureSensor();
        Display display = new Display();
        AirConditioner airConditioner = new AirConditioner();
        SecuritySystem securitySystem = new SecuritySystem();

        sensor.TemperatureChanged += display.ShowTemperature;
        sensor.TemperatureChanged += airConditioner.ReactToTemperature;
        sensor.TemperatureChanged += securitySystem.CheckTemperature;

        sensor.SetTemperature(15);
        sensor.SetTemperature(20);
        sensor.SetTemperature(28);
        sensor.SetTemperature(42);
        sensor.SetTemperature(3);
    }
}