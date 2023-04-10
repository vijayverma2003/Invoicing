import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access-token");
      window.location.href = "/login?exp=true";
    }
  }
);

export function setJWT(jwt: string | null) {
  if (jwt) axios.defaults.headers.common["Authorization"] = `JWT ${jwt}`;
}

export default axios;
