import { SimpleInvoice } from "./invoice";
import Country from "./country";
import Form from "./form";

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: Country | string;
  invoices?: SimpleInvoice[];
  gstin: null | string;
}

export const customerForm: Form<Customer> = {
  initialState: {
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    state: "",
    gstin: "",
  },
  inputs: [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "gstin", placeholder: "GSTIN", type: "text" },
    { name: "phone", placeholder: "Phone", type: "tel" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "street", placeholder: "Street Address", type: "text" },
    { name: "city", placeholder: "City", type: "text" },
    { name: "state", placeholder: "State", type: "text" },
    {
      name: "country",
      placeholder: "Country",
      type: "text",
      elementtype: "select",
    },
  ],
};
