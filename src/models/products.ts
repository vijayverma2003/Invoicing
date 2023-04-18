import Form from "./form";
import { SimpleInvoiceItem } from "./invoice";

export interface Product {
  hsn?: string;
  id?: number;
  invoice_items?: SimpleInvoiceItem[];
  name: string;
  price: number | "";
  tax: number | "";
  unit: string;
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
