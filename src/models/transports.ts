import Form from "./form";

export interface Transport {
  id?: number;
  name: string;
  transporter_id?: string;
  mode: string;
  vehicle_number: null | string;
}

export const transportForm: Form<Transport> = {
  initialState: { name: "", transporter_id: "", mode: "", vehicle_number: "" },
  inputs: [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "mode", type: "text", placeholder: "Mode" },
    { name: "vehicle_number", type: "text", placeholder: "Vehicle Number" },
    { name: "transporter_id", type: "text", placeholder: "Transporter ID" },
  ],
};
