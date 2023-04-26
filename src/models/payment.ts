import moment from "moment";
import Form from "./form";

export default interface Payment {
  id?: number | string;
  amount: number | string;
  datetime: string;
  mode: string;
  invoice?: string | number;
}

export const paymentForm: Form<Payment> = {
  initialState: {
    amount: "",
    datetime: moment().format("YYYY-MM-DD"),
    mode: "",
  },
  inputs: [
    { name: "amount", type: "number", placeholder: "Amount" },
    {
      name: "datetime",
      placeholder: "Date",
      type: "date",
    },
    {
      name: "mode",
      placeholder: "Mode of payment",
      type: "text",
    },
  ],
};
