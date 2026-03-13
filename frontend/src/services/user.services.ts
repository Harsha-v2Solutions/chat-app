/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { type AxiosResponse } from "axios";
import apiClient from "../api/apiClient";
import type { NewUser, User } from "../types/userTypes";

interface ApiErrorResponse {
  message?: string;
  errors?: { field: string; message: string }[];
}

interface ErrorResponse {
  field: string;
  message: string;
}

export function handleError(error: unknown): ErrorResponse[] {
  if (axios.isAxiosError(error) && error.response?.status === 422) {
    const serverResponse = error.response.data as ApiErrorResponse;
    return serverResponse.errors;
  }
  return [
    {
      field: "root",
      message: axios.isAxiosError(error) ? error.message : String(error),
    },
  ];
}

export const createUser = async (
  userDetails: NewUser,
): Promise<AxiosResponse<User>> => {
  return await apiClient.post<User>("/admin/users", userDetails);
};

export const updateUser = async (
  userDetails: User,
): Promise<AxiosResponse<User>> => {
  return await apiClient.put<User>(
    `/admin/users/${userDetails.id}`,
    userDetails,
  );
};

export const deleteUser = async (id: bigint): Promise<AxiosResponse> => {
  return await apiClient.delete(`/admin/users/${Number(id)}`);
};
