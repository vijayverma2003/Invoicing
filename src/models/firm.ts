import Form from "./form";

export interface Firm {
  id?: number;
  name: string;
  gstin?: string;
}

export const firmForm: Form<Firm> = {
  initialState: { name: "", gstin: "" },
  inputs: [{ name: "name", type: "text", placeholder: "Name" }],
};
