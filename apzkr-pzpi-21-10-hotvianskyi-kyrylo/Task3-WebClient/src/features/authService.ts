import axios from "axios";
import apiClient from "../config/apiClient";
import {AuthResultDto, CreateMemberCommand, SignInCommand} from "../interfaces/account";

const signIn = async (
  email : string,
  password : string
): Promise<AuthResultDto> => {
  try {
    const request: SignInCommand = { email, password };
    const response = await apiClient.post<AuthResultDto>(
      'auth/login',
      request
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const signUp = async (
  email : string,
  password : string,
  firstName : string,
  lastName : string,
  sex : string,
  dateOfBirth : string,

): Promise<AuthResultDto> => {
  try {
    const request: CreateMemberCommand = {
      email, 
      password, 
      firstName, 
      lastName,
      sex,
      dateOfBirth
    };
    const response = await apiClient.post<AuthResultDto>(
      'auth/register',
      request
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};



const authService = {
  signIn,
  signUp
};

export default authService;