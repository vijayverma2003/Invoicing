import { Customer } from "./customers";
import { Firm } from "./firm";
import { Product } from "./products";
import { Transport } from "./transports";
import Form from "./form";
import moment from "moment";
import Payment from "./payment";

export interface SimpleInvoice {
  id: number;
  number: number;
  date: string;
  total_cost: number;
  total_tax: number;
}
export interface SimpleInvoiceItem {
  invoice: number;
  price: number;
  quantity: number;
}

export interface InvoiceItem {
  product: Product | string;
  price: number | string;
  discount: number | string;
  packing_charges: number | string;
  quantity: number | string;
  total?: number;
  total_with_tax?: number;
}

export interface Invoice {
  id?: number;
  number: string;
  date: string;
  due_date: string;
  terms: string;
  customer: Customer | string;
  transport: Transport | string;
  firm: Firm | string | number;
  items: InvoiceItem[];
  total_cost?: number;
  total_tax?: number;
  payments?: Payment[];
}

export interface InvoiceResponse {
  id: number;
  number: string;
  date: string;
  due_date: string;
  terms: string;
  customer: Customer | string;
  transport: Transport | string;
  firm: Firm | string | number;
  items: InvoiceItem[];
  total_cost: number;
  total_tax: number;
  payments: Payment[];
}

export const invoiceForm: Form<Invoice> = {
  initialState: {
    number: "",
    date: moment().format("YYYY-MM-DD"),
    due_date: moment().add(10, "days").format("YYYY-MM-DD"),
    terms: "",
    customer: "",
    firm: "",
    transport: "",
    items: [
      {
        product: "",
        price: "",
        discount: 0,
        packing_charges: 0,
        quantity: "",
        total: 0,
        total_with_tax: 0,
      },
    ],
  },

  inputs: [
    { name: "number", type: "text", placeholder: "INV Number" },
    { name: "date", type: "date", placeholder: "Date" },
    { name: "due_date", type: "date", placeholder: "Due Date" },
    { name: "terms", type: "text", placeholder: "Terms & Conditions" },
    {
      name: "customer",
      type: "text",
      placeholder: "Customer",
      elementtype: "select",
    },
    {
      name: "transport",
      type: "text",
      placeholder: "Transport",
      elementtype: "select",
    },
    {
      name: "transport",
      type: "text",
      placeholder: "Transport",
      elementtype: "select",
    },
  ],
};

export const invoiceItemForm: Form<InvoiceItem> = {
  initialState: {
    product: "",
    price: "",
    discount: "",
    packing_charges: "",
    quantity: "",
  },

  inputs: [
    { name: "product", placeholder: "Product", type: "text" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "quantity", placeholder: "Quantity", type: "number" },
    { name: "discount", placeholder: "Discount", type: "number" },
    { name: "packing_charges", placeholder: "Pkg. Charges", type: "number" },
  ],
};
