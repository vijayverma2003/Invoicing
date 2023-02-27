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

interface FormObjectModel {
  initialState: { [key: string]: string | number | null | any[] };
  model: { [key: string]: Input };
}

interface FormArrayModel {
  initialState: { [key: string]: string | number | null | any[] };
  model: Input[];
}

export const loginAndRegisterFormModel: FormObjectModel = {
  initialState: { email: "", password: "", products: [{ email: "" }] },

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

export const productFormModel: FormArrayModel = {
  initialState: { name: "", hsn: "", cost: "", unit: "", tax: "" },
  model: [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
    {
      name: "hsn",
      placeholder: "HSN/SAC",
      type: "number",
      value: "",
    },
    {
      name: "cost",
      placeholder: "Cost",
      type: "number",
      value: "",
    },
    {
      name: "unit",
      placeholder: "Unit",
      type: "text",
      value: "",
    },
    {
      name: "tax",
      placeholder: "Tax",
      type: "number",
      value: "",
    },
  ],
};

export const customerFormModel: FormObjectModel = {
  initialState: {
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
  },

  model: {
    name: {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
    email: {
      name: "email",
      placeholder: "Email",
      type: "email",
      value: "",
    },
    phone: {
      name: "phone",
      placeholder: "Phone",
      type: "text",
      value: "",
    },
    street: {
      name: "street",
      placeholder: "Street Address",
      type: "text",
      value: "",
    },
    city: {
      name: "city",
      placeholder: "City",
      type: "text",
      value: "",
    },
    state: {
      name: "state",
      placeholder: "State",
      type: "text",
      value: "",
    },
  },
};

export const transportFormModel: FormObjectModel = {
  initialState: {
    name: "",
    transporter_id: "",
    mode: "",
  },

  model: {
    transporter_id: {
      name: "transporter_id",
      placeholder: "ID",
      type: "text",
      value: "",
    },
    name: {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
    mode: {
      name: "mode",
      placeholder: "Mode",
      type: "text",
      value: "",
    },
  },
};
