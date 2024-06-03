import {MemberDto} from "./member.ts";
import {PoolDto} from "./pool.ts";

export interface PoolEnrollmentDto {
    id: number,
    member: MemberDto,
    pool: PoolDto,
    enrollmentDate: string,
}