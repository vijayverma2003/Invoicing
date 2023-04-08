import Form from "./form";

export interface Transport {
  id?: number;
  name: string;
  transporter_id?: string;
  mode: string;
}

export const transportForm: Form<Transport> = {
  initialState: { name: "", transporter_id: "", mode: "" },
  inputs: [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "transporter_id", type: "text", placeholder: "Transporter ID" },
    { name: "mode", type: "text", placeholder: "Mode" },
  ],
};
