import Form from "./form";

export interface User {
  username: string;
  email: string;
  password: string;
}

export const registerForm: Form = {
  initialState: { username: "", email: "", password: "" },
  inputs: [
    { name: "username", placeholder: "Username", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "password", placeholder: "Password", type: "password" },
  ],
};
