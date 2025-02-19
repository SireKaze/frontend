import axios, { AxiosInstance } from "axios";
 
export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3900",
  headers: { "Content-Type": "application/json" },
});
 
export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total: number;
  };
}