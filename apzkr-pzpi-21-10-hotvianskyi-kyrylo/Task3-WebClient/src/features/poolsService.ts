import apiClient from "../config/apiClient.ts";
import axios from "axios";
import {PoolDto} from "../interfaces/pool.ts";
import {PoolEnrollmentDto} from "../interfaces/poolEnrollment.ts";

const sendRequestToPool = async (token: string, poolId: number) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        await apiClient.post(
            'poolEnrollments',
            {poolId},
            { headers }
        );
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}

const getAllPoolRequests = async (token: string) : Promise<PoolEnrollmentDto[]> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        const response = await apiClient.get(
            'poolEnrollments/getAll',
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

const leaveFromPool = async (token: string) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        await apiClient.put(
            'members/leaveFromPool',
            null,
            { headers }
        );
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}

const deletePoolEnrollment = async (token: string, id: number) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        await apiClient.delete(
            `poolEnrollments/${id}`,
            { headers }
        );
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}

const getAllPools = async (token: string): Promise<PoolDto[]> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };

        const response = await apiClient.get<PoolDto[]>(
            "pools/getAll",
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

export const poolsService = {
    leaveFromPool,
    getAllPools,
    sendRequestToPool,
    getAllPoolRequests,
    deletePoolEnrollment
}