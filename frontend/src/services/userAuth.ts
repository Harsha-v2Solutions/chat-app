import type { User } from "../types/userTypes";
import apiClient from "../api/apiClient";
import axios, { type AxiosResponse } from "axios";

export const loginUser = async (
  username: string,
  password: string,
): Promise<User | string> => {
  try {
    const response = await apiClient.post<User>("login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return "Invalid username or password. Please try again.";
        }
      }
      if (
        error.request !== undefined &&
        error.request !== null &&
        !window.navigator.onLine
      ) {
        return "No internet connection. Please check your network.";
      }
    }
    // eslint-disable-next-line no-console
    console.log(error);
    return "Server is currently unreachable. Please try again later.";
  }
};

export const verifySession = async (): Promise<User | null> => {
  try {
    // This triggers Passport's deserializeUser on the backend
    const { data } = await apiClient.get<User>("verify-session");
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error occurred in verify session: ", (error as Error).message);
    return null;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    await apiClient.delete("/logout");
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

export const registerUser = async (
  userName: string,
  firstName: string,
  lastName: string,
  uniqueId: string,
  password: string,
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post(`register`, {
      email: userName,
      firstName,
      lastName,
      uniqueId,
      password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        return error.response;
      }
    }
    return error;
  }
};
