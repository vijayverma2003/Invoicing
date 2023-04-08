import Form, { Input } from "./form";

export interface Product {
  id?: number;
  name: string;
  price: number | "";
  tax: number | "";
  unit: string;
  hsn?: string;
}

export const productForm: Form<Product> = {
  initialState: { name: "", price: "", tax: "", unit: "", hsn: "" },
  inputs: [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "tax", placeholder: "Tax", type: "number" },
    { name: "unit", placeholder: "Unit", type: "text" },
    { name: "hsn", placeholder: "HSN", type: "text" },
  ],
};
