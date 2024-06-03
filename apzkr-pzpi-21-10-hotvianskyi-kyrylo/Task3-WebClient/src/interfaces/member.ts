import {PoolDto} from "./pool.ts";

export interface UpdateMemberCommand {
    firstName: string,
    lastName: string
}

export interface MemberDto {
    id: number,
    identityId : string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    pool?: PoolDto
}