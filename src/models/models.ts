import emailSVG from "../svg/email.svg";
import passwordSVG from "../svg/password.svg";

export interface Input {
  name: string;
  placeholder: string;
  svg?: string;
  type: string;
  value: string;
  tabular?: string;
}

interface FormModel {
  initialState: { [key: string]: string | number | null | any[] };
  model: { [key: string]: Input };
}

export const loginAndRegisterFormModel: FormModel = {
  initialState: { email: "", password: "", products: [{ email: "" }] },

  model: {
    email: {
      name: "email",
      placeholder: "Email Address",
      svg: emailSVG,
      type: "email",
      value: "",
      tabular: "products",
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
