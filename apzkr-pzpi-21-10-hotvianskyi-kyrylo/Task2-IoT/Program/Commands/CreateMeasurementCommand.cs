namespace Program.Commands;

public class CreateMeasurementCommand
{
    public double Height { get; set; }
    public double Weight { get; set; }
    public double FatPercentage { get; set; }
    public double MusclePercentage { get; set; }
    public int UpperPressure { get; set; }
    public int LowerPressure { get; set; }
}