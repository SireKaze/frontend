/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { BaseResponseSuccess } from "@/lib/axiosClient";
interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends BaseResponseSuccess {}

export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password"> {}

//login
interface User {
  id?: number;
  nama: string;
  email: string;
  avatar: any;
  password: string;
  refresh_token: string;
  access_token: string;
  role: string;
}

export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface socialPayload extends Pick<User, "email" | "avatar" | "nama"> {}
export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password"> {}

export interface RegisterResponse extends BaseResponseSuccess {}
export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}