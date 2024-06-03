export interface MeasurementDto {
    id: number,
    memberId: number,
    dateAndTime: string,
    height: number,
    weight: number,
    fatPercentage: number,
    musclePercentage: number,
    upperPressure: number,
    lowerPressure: number,
    bodyMassIndex: number,
    levelOfStress: number,
}