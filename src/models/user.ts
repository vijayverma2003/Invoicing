import Form from "./form";

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface LoginFields {
  username: string;
  password: string;
}

export const registerForm: Form<User> = {
  initialState: { username: "", email: "", password: "" },
  inputs: [
    { name: "username", placeholder: "Username", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "password", placeholder: "Password", type: "password" },
  ],
};

export const loginForm: Form<LoginFields> = {
  initialState: { username: "", password: "" },
  inputs: [
    { name: "username", placeholder: "Username", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
  ],
};
