import apiClient from "../api/apiClient";
import type { User } from "../types/userTypes";

export default async function getAllUser(): Promise<User[]> {
  try {
    const response = await apiClient.get<User[]>(`/users`);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
