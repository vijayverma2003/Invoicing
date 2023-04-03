import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNTkyMDI4LCJqdGkiOiJmYWFjOTU4NTdkN2Q0MDM4YTZjZWYzMTQ2OGIyMjQxOSIsInVzZXJfaWQiOjF9.cTLv8gZsnosfeNDEJFh8lZdE262rVbvgJZEZcqZuXyE",
  },
});

export default http;
