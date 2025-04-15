/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axiosClient";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "../interface";
import Swal from "sweetalert2";
import { Sign } from "crypto";
 
const useAuthModule = () => {
  const router = useRouter();
  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post("/auth/register", payload).then((res) => res.data);
  };
 
  const useRegister = () => {
    const { mutate, isPending: isLoading } = useMutation(
      // (payload: RegisterPayload) => register(payload),
      
      {
        mutationFn: async (payload: RegisterPayload) => register(payload),
        onSuccess: (response: any) => {
          Swal.fire({
            title: "Good job!",
            text: response.message,
            icon: "success",
          });
          router.push("/auth/login");
        },
        onError: (error: any) => {
          console.log("error:", error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        },
      }
    );
    return { mutate,  isPending: isLoading };
  };
  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isPending: isLoading } = useMutation(
      // (payload: LoginPayload) => login(payload),
      {
        mutationFn: async (payload: LoginPayload) => login(payload),
        onSuccess: async (response:any) => {
          Swal.fire({
            title: "Good job!",
            text: response.message,
            icon: "success",
          });
          console.log("response", response);
          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            email: response.data.email,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            role: response.data.role,
            redirect: false,
          });
          // router.push("/admin");
        },
        onError: (error:any) => {
          console.log("error:", error.message);
          if (error.response.status == 422) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              footer: '<a href="#">Why do I have this issue?</a>',              
            });
          } else {

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        },
      }
    );
    return { mutate, isPending: isLoading };
  };

 
  return { useRegister, useLogin };
  
};
 
export default useAuthModule;