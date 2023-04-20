import Form from "./form";

export default interface Payment {
  id?: number | string;
  amount: number | string;
  datetime?: string;
  mode: string;
}

export const paymentForm: Form<Payment> = {
  initialState: { amount: "", mode: "" },
  inputs: [
    { name: "amount", type: "number", placeholder: "Amount" },
    {
      name: "mode",
      placeholder: "Mode of payment",
      type: "text",
    },
  ],
};
