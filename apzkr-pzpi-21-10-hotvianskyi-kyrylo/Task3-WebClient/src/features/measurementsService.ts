import apiClient from "../config/apiClient.ts";
import axios from "axios";
import {MeasurementDto} from "../interfaces/measurement.ts";
import {RecommendationDto} from "../interfaces/recommendation.ts";

const getAllMeasurementsByMember = async (token: string) : Promise<MeasurementDto[]> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        const response = await apiClient.get(
            'measurements/getAllByMember',
            { headers }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}

const getRecommendationByIdForMember = async (token: string, measurementId: number) : Promise<RecommendationDto[]> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        const response = await apiClient.get(
            `recommendations/getBySpecificMeasurementByMember/${measurementId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}

export const measurementsService = {
    getAllMeasurementsByMember,
    getRecommendationByIdForMember
}