import Form from "./form";

export interface Bank {
  name: string;
  acc: string;
  ifsc: string;
  branch: string;
}

export const bankForm: Form<Bank> = {
  initialState: { name: "", acc: "", ifsc: "", branch: "" },
  inputs: [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "acc", type: "text", placeholder: "Account Number" },
    { name: "ifsc", type: "text", placeholder: "IFSC Code" },
    { name: "branch", type: "text", placeholder: "Branch City" },
  ],
};
