import apiClient from "../config/apiClient.ts";
import axios from "axios";

const exportData = async (token: string): Promise<Blob> => {
    try {
        const headers = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
        const response = await apiClient.get(
            'data/exportData',
            { headers, responseType: 'blob'},
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

export const dataExportService = {
    exportData
}