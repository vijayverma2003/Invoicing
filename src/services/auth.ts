import { LoginFields, User } from "../models/user";
import { setJWT } from "./http";
import axios from "axios";
import jwtDecode from "jwt-decode";

const http = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

export async function register(data: User) {
  return http.post("/users/", data);
}

export async function login(data: LoginFields) {
  const { data: jwt } = await http.post("/jwt/create/", data);
  localStorage.setItem("access-token", jwt.access);
  localStorage.setItem("refresh-token", jwt.refresh);
}

export function getJWT() {
  return localStorage.getItem("access-token");
}

export function getUserID() {
  const jwt = getJWT();
  if (jwt) return jwtDecode(jwt);
  return null;
}

setJWT(getJWT());
