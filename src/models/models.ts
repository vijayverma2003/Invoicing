import emailSVG from "../svg/email.svg";
import passwordSVG from "../svg/password.svg";

export const loginForm = {
  initialState: { email: "", password: "" },

  model: {
    email: {
      name: "email",
      placeholder: "Email Address",
      svg: emailSVG,
      type: "email",
      value: "",
    },
    password: {
      name: "password",
      placeholder: "Password",
      svg: passwordSVG,
      type: "password",
      value: "",
    },
  },
};
