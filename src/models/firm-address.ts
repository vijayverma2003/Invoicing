import Form from "./form";

export interface FirmAddress {
  street?: string;
  city: string;
  state: string;
  country: string;
}

export const firmAddressForm: Form<FirmAddress> = {
  initialState: { street: "", city: "", state: "", country: "" },
  inputs: [
    { name: "street", type: "text", placeholder: "Street Address" },
    { name: "country", type: "text", placeholder: "Country" },
    { name: "city", type: "text", placeholder: "City" },
    { name: "state", type: "text", placeholder: "State" },
  ],
};
