import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwODUyMjY5LCJqdGkiOiIzZjc1YWJhM2U3MWI0ZjhlYTNmODI4YWFiYzQ1ODVjZiIsInVzZXJfaWQiOjF9.k846cIWMVdqoFFHDhm6XoqbliT1Ic2pL9ZqT-V1UG74",
  },
});

export default http;
