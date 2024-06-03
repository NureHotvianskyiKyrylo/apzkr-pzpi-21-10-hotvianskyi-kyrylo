import axios from "axios";
import apiClient from "../config/apiClient";
import {MemberDto, UpdateMemberCommand} from "../interfaces/member.ts";

const updateMember = async (
    token : string,
    updateMemberCommand : UpdateMemberCommand
) : Promise<void> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        await apiClient.put(
            'members/updateInfo',
            updateMemberCommand,
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

const getMemberByUser = async (
    token : string
) : Promise<MemberDto> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        const response = await apiClient.get<MemberDto>(
            'members/getByUser',
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

const enrollMemberToPool = async (
    token : string,
    memberId : number,
    poolId : number
) : Promise<void> => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        await apiClient.put(
            'members/enrollToPool',
            { memberId, poolId },
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

export const membersService = {
    updateMember,
    getMemberByUser,
    enrollMemberToPool
};