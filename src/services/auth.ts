import axios from "axios";
import { User } from "../models/user";

const http = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

export const register = (data: { [key: string]: any }) => {
  return http.post("/users/", data);
};

export const createJWT = (data: { [key: string]: any }) => {
  return http.post("/jwt/create/", data);
};

export const login = async (data: { [key: string]: string }) => {
  const { data: jwt } = await http.post("/jwt/create/", data);
  localStorage.setItem("access-token", jwt.access);
  localStorage.setItem("refresh-token", jwt.refresh);
};
