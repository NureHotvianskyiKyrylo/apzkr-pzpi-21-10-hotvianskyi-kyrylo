using System;
using Program.Commands;

namespace Program.Services;

public class MeasurementService
{
    public CreateMeasurementCommand GenerateMeasurement()
    {
        Random random = new();

        int upperPressure = random.Next(100, 250);
        int lowerPressure = upperPressure - random.Next(0, 50);

        return new CreateMeasurementCommand
        {
            Height = random.Next(150, 210),
            Weight = random.Next(60, 150),
            FatPercentage = random.Next(3, 60),
            MusclePercentage = random.Next(8, 60),
            UpperPressure = upperPressure,
            LowerPressure = lowerPressure,
        };
    }
}