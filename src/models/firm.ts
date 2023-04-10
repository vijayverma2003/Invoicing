import { FirmAddress } from "./firm-address";
import Form from "./form";

export interface Firm {
  id?: number;
  name: string;
  gstin?: string;
  address?: FirmAddress;
}

export const firmForm: Form<Firm> = {
  initialState: { name: "", gstin: "" },
  inputs: [{ name: "name", type: "text", placeholder: "Name" }],
};
