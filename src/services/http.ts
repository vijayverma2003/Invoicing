import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNzY1NTY2LCJqdGkiOiJkNDhkMGUxY2ZkY2E0ZGNkODdiYTEwMzBjOGJmN2M2YyIsInVzZXJfaWQiOjF9.Wc3BT90P7LPr_xgBZWVmAmi_VXAebibzpKfFRcnVjWk",
  },
});

export default http;
