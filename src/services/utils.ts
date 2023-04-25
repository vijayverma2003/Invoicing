import { Customer } from "../models/customers";
import { Invoice } from "../models/invoice";
import Payment from "../models/payment";

export function showAddress(customer: Customer) {
  let address = "";
  if (customer.street) address += `${customer.street}, `;
  address += `${customer.city}, ${customer.state}, ${
    typeof customer.country !== "string" ? customer.country.name : ""
  }`;

  return address;
}

export function getTotalPayment(payments: Payment[]) {
  return payments.reduce((a, b) => (a += Number(b.amount)), 0);
}

export function getGrandTotal(invoice: Invoice) {
  if (invoice.total_cost && invoice.total_tax)
    return invoice.total_cost + invoice.total_tax;
  return 0;
}

export function getRecievables(invoice: Invoice, totalPayment: number) {
  if (invoice.total_cost && invoice.total_tax)
    return invoice.total_cost + invoice.total_tax - totalPayment;
  return 0;
}
