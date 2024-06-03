export interface AuthResultDto {
    userId?: string;
    bearer?: string | undefined;
    role?: string;
}

export interface SignInCommand {
    email?: string | undefined;
    password?: string | undefined;
}

export interface CreateMemberCommand {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    sex: string,
    dateOfBirth: string
}