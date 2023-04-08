import axios from "axios";
import { setJWT } from "./http";
import jwtDecode from "jwt-decode";

const http = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

interface Data {
  [key: string]: string;
}

export async function register(data: Data) {
  return http.post("/users/", data);
}

export async function login(data: Data) {
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
