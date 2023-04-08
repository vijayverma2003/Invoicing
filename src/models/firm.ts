import Form from "./form";

export interface Firm {
  name: string;
}

export const firmForm: Form = {
  initialState: { name: "", gstin: "" },
  inputs: [{ name: "name", type: "text", placeholder: "Name" }],
};
