import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function setJWT(jwt: string | null) {
  if (jwt) axios.defaults.headers.common["Authorization"] = `JWT ${jwt}`;
}

export default axios;
