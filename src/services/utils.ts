import { Customer } from "../models/customers";

export function showAddress(customer: Customer) {
  let address = "";
  if (customer.street) address += `${customer.street}, `;
  address += `${customer.city}, ${customer.state}, ${
    typeof customer.country !== "string" ? customer.country.name : ""
  }`;

  return address;
}
