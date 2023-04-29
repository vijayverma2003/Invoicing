import { Bank } from "./bank";
import { FirmAddress } from "./firm-address";
import Form from "./form";

export interface Firm {
  id?: number;
  name: string;
  gstin: null | string;
  address?: FirmAddress;
  bank?: Bank;
  logo?: FirmLogo | null;
}

export interface FirmLogo {
  image: "string";
}

export const firmForm: Form<Firm> = {
  initialState: { name: "", gstin: "" },
  inputs: [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "gstin", type: "text", placeholder: "GSTIN" },
  ],
};
