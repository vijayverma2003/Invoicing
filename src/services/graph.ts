import Graph from "../models/graph";
import { getMonthsArray } from "./time";

export function graphDataForInvoice() {
  const invoiceGraphData: Graph = {
    id: "invoice",
    color: "red",
    data: [],
  };

  for (let month of getMonthsArray())
    invoiceGraphData.data.push({
      x: month,
      y: 0,
    });

  return invoiceGraphData;
}
