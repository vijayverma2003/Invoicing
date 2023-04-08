import emailSVG from "../svg/email.svg";
import passwordSVG from "../svg/password.svg";
import moment from "moment";

export interface Input {
  name: string;
  placeholder: string;
  svg?: string;
  type: string;
  value: string;
  tabular?: string;
  label?: boolean;
}

interface FormObjectModel {
  initialState: { [key: string]: string | number | null | any[] };
  model: { [key: string]: Input };
}

interface FormArrayModel {
  initialState: { [key: string]: string | number | null | any[] };
  model: Input[];
}

export const firmFormModel: FormObjectModel = {
  initialState: { name: "" },

  model: {
    name: {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
  },
};

export const firmAddressFormModel: FormObjectModel = {
  initialState: { street: "", city: "", state: "", country: "" },

  model: {
    street: {
      name: "street",
      placeholder: "Street Address",
      type: "text",
      value: "",
    },
    city: {
      name: "city",
      placeholder: "City",
      type: "text",
      value: "",
    },
    state: {
      name: "state",
      placeholder: "State",
      type: "text",
      value: "",
    },
    country: {
      name: "country",
      placeholder: "Country",
      type: "text",
      value: "",
    },
  },
};

export const bankFormModel: FormObjectModel = {
  initialState: { name: "", ifsc: "", acc: "", branch: "" },

  model: {
    name: {
      name: "name",
      placeholder: "Bank Name",
      type: "text",
      value: "",
    },
    ifsc: {
      name: "ifsc",
      placeholder: "IFSC Code",
      type: "text",
      value: "",
    },
    acc: {
      name: "acc",
      placeholder: "A/C number",
      type: "text",
      value: "",
    },
    branch: {
      name: "branch",
      placeholder: "Branch City",
      type: "text",
      value: "",
    },
  },
};

export const productFormModel: FormArrayModel = {
  initialState: { name: "", hsn: "", cost: "", unit: "", tax: "" },
  model: [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
    {
      name: "hsn",
      placeholder: "HSN/SAC",
      type: "number",
      value: "",
    },
    {
      name: "cost",
      placeholder: "Cost",
      type: "number",
      value: "",
    },
    {
      name: "unit",
      placeholder: "Unit",
      type: "text",
      value: "",
    },
    {
      name: "tax",
      placeholder: "Tax",
      type: "number",
      value: "",
    },
  ],
};

export const customerFormModel: FormObjectModel = {
  initialState: {
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
  },

  model: {
    name: {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
    email: {
      name: "email",
      placeholder: "Email",
      type: "email",
      value: "",
    },
    phone: {
      name: "phone",
      placeholder: "Phone",
      type: "text",
      value: "",
    },
    street: {
      name: "street",
      placeholder: "Street Address",
      type: "text",
      value: "",
    },
    city: {
      name: "city",
      placeholder: "City",
      type: "text",
      value: "",
    },
    state: {
      name: "state",
      placeholder: "State",
      type: "text",
      value: "",
    },
  },
};

export const transportFormModel: FormObjectModel = {
  initialState: {
    name: "",
    transporter_id: "",
    mode: "",
  },

  model: {
    transporter_id: {
      name: "transporter_id",
      placeholder: "ID",
      type: "text",
      value: "",
    },
    name: {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
    },
    mode: {
      name: "mode",
      placeholder: "Mode",
      type: "text",
      value: "",
    },
  },
};

export const invoiceFormModel: FormObjectModel = {
  initialState: {
    number: "",
    date: moment().format("YYYY-MM-DD"),
    due_date: moment().add(10, "days").format("YYYY-MM-DD"),
    customer: "",
    transport: "",
    products: [{ name: "", cost: "", discount: "", qty: "" }],
  },

  model: {
    number: {
      name: "number",
      placeholder: "Invoice number",
      type: "text",
      value: "",
      label: true,
    },
    date: {
      name: "date",
      placeholder: "Date",
      type: "date",
      value: "",
      label: true,
    },
    due_date: {
      name: "due_date",
      placeholder: "Due Date",
      type: "date",
      value: "",
      label: true,
    },
    customer: {
      name: "customer",
      placeholder: "Customer",
      type: "text",
      value: "",
    },
    transport: {
      name: "transport",
      placeholder: "Transporter",
      type: "text",
      value: "",
      label: true,
    },

    name: {
      name: "name",
      placeholder: "Name",
      type: "text",
      value: "",
      tabular: "products",
    },
    cost: {
      name: "cost",
      placeholder: "Cost",
      type: "number",
      value: "",
      tabular: "products",
    },
    qty: {
      name: "qty",
      placeholder: "Qty",
      type: "number",
      value: "",
      tabular: "products",
    },
    discount: {
      name: "discount",
      placeholder: "Discount",
      type: "number",
      value: "",
      tabular: "products",
    },
    packing_charges: {
      name: "packing_charges",
      placeholder: "Pkg. Charges",
      type: "number",
      value: "",
      tabular: "products",
    },
  },
};
