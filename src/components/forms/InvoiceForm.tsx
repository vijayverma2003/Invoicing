import { AppDispatch } from "../../store/configureStore";
import { Customer } from "../../models/customers";
import { getCustomers, loadCustomers } from "../../store/entities/customers";
import { getCurrency, getFirm, loadFirm } from "../../store/user-info/firm";
import { getProducts, loadProducts } from "../../store/entities/products";
import { getTransports, loadTransports } from "../../store/entities/transports";
import { Invoice, InvoiceItem, invoiceForm } from "../../models/invoice";
import { IoIosAdd } from "react-icons/io";
import { showAddress } from "../../services/utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { z } from "zod";
import Input from "../common/Input";
import queryString from "query-string";
import Select from "../common/Select";
import useForm from "../../hooks/useForm";
import {
  addInvoice,
  getFailedRequestError,
  getInvoice,
} from "../../store/entities/invoices";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  number: z
    .string()
    .min(1, "Invoice number is required")
    .max(55, "Invoice number must be less than 55 characters"),
  customer: z.string().min(1, "Customer is required"),
  transport: z.string(),
  date: z.string().min(1, "Date is required"),
  due_date: z.string(),
  terms: z.string().max(2000, "Terms must be less than 2000 characters"),
  items: z
    .array(
      z.object({
        product: z.string(),
        price: z.number({ invalid_type_error: "Price is required" }),
        discount: z.number().max(100, "Price must be less than 100"),
        packing_charges: z.number(),
        quantity: z.number({ invalid_type_error: "Price is required" }),
      })
    )
    .nonempty(),
});

const requiredSchema = schema.required({
  number: true,
  customer: true,
  date: true,
  // items: true,
});

function InvoiceForm() {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const { id } = queryString.parse(window.location.search);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currency = useSelector(getCurrency);

  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    setData,
    handleTabularChange,
  } = useForm<Invoice>(invoiceForm.initialState);

  const customers = useSelector(getCustomers);
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const firm = useSelector(getFirm);
  const invoice = useSelector(getInvoice(id as string));
  const products = useSelector(getProducts);
  const transports = useSelector(getTransports);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCustomers());
    dispatch(loadTransports());
    dispatch(loadFirm());
  }, [dispatch]);

  useEffect(() => {
    if (invoice) setData(invoice);
  }, [invoice, setData]);

  useEffect(() => {
    if (firm && firm.id) setData({ ...data, firm: firm.id });
  }, [firm, setData]);

  useEffect(() => {
    if (data.customer) {
      const customer = customers.findIndex(
        (customer) => customer.id === parseInt(data.customer)
      );
      setCurrentCustomer(customers[customer]);
    }
  }, [data.customer, setCurrentCustomer, customers]);

  const handleAddProduct = () => {
    const invoice = { ...data };
    invoice.items.push({
      product: "",
      price: "",
      discount: 0,
      packing_charges: 0,
      quantity: "",
      total: 0,
      total_with_tax: 0,
    });
    setData(invoice);
  };

  const onSubmit = () => {
    dispatch(addInvoice(data as Invoice));

    if (failedAPIRequestError) return;

    navigate("/invoices/");
  };

  const handleTotalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const d = { ...data };
    d.items[i].total = e.target.value;
    setData(d);
  };

  const handleProductDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const d = { ...data };

    const index = products.findIndex(
      (p) => p.id === Number(d.items[i].product)
    );
    const product = products[index];

    d.items[i].total = d.items[i].price * d.items[i].quantity;

    const totalDiscount = (d.items[i].total * d.items[i].discount) / 100;
    d.items[i].total -= totalDiscount;

    if (d.items[i].packing_charges)
      d.items[i].total += d.items[i].packing_charges;

    if (product.tax)
      d.items[i].total_with_tax =
        d.items[i].total + (d.items[i].total * product.tax) / 100;

    setData(d);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h4 className="page-heading">New Invoice</h4>
      </div>
      <div className="page-content">
        <form onSubmit={(e) => handleSubmit(e, requiredSchema, onSubmit)}>
          <div className="grid grid-1x4 mb2">
            <Input
              name="number"
              type="text"
              placeholder="INV Number"
              onChange={handleChange}
              value={data["number"]}
              error={errors["number"]}
            />
            <Input
              name="order_number"
              type="text"
              placeholder="Order Number"
              onChange={handleChange}
              value={data["order_number"]}
              error={errors["order_number"]}
            />
            <Input
              name="date"
              type="date"
              placeholder="Date"
              onChange={handleChange}
              value={data["date"]}
              error={errors["date"]}
            />
            <Input
              name="due_date"
              type="date"
              placeholder="Due Date"
              onChange={handleChange}
              value={data["due_date"]}
              error={errors["due_date"]}
            />
            <Input
              name="ewaybill"
              type="text"
              placeholder="E-Way Bill"
              onChange={handleChange}
              value={data["ewaybill"]}
              error={errors["ewaybill"]}
            />
            <Select
              name="transport"
              type="text"
              placeholder="Transport"
              onChange={handleChange}
              value={data["transport"]}
              error={errors["transport"]}
              options={transports}
            />
          </div>
          <div className="grid grid-1x4 grid-max-1x4">
            <div>
              <Select
                name="customer"
                type="text"
                placeholder="Customer"
                onChange={handleChange}
                value={data["customer"]}
                error={errors["customer"]}
                options={customers}
              />
              {currentCustomer ? (
                <h5>
                  <i>{showAddress(currentCustomer)}</i>
                </h5>
              ) : null}
            </div>
          </div>
          <h3 className="form-heading">Products</h3>
          {data.items.map((item: InvoiceItem, index: number) => (
            <div key={index}>
              <div className="grid grid-1x4 grid-center">
                <Select
                  name="product"
                  type="text"
                  placeholder="Product"
                  onChange={(e) => handleTabularChange(e, "items", index)}
                  value={data["items"][index]["product"]}
                  error={errors[""]}
                  options={products}
                />
                <div className="grid grid-1x2">
                  <Input
                    name="price"
                    type="number"
                    placeholder="Price"
                    onChange={(e) =>
                      handleTabularChange(
                        e,
                        "items",
                        index,
                        handleProductDetailsChange
                      )
                    }
                    value={data["items"][index]["price"]}
                    error={errors[""]}
                  />
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) =>
                      handleTabularChange(
                        e,
                        "items",
                        index,
                        handleProductDetailsChange
                      )
                    }
                    value={data["items"][index]["quantity"]}
                    error={errors[""]}
                  />
                </div>
                <div className="grid grid-1x2">
                  <Input
                    name="discount"
                    type="number"
                    placeholder="Discount"
                    onChange={(e) =>
                      handleTabularChange(
                        e,
                        "items",
                        index,
                        handleProductDetailsChange
                      )
                    }
                    value={data["items"][index]["discount"]}
                    error={errors[""]}
                    max={99}
                  />
                  <Input
                    name="packing_charges"
                    type="number"
                    placeholder="Pkg. Charges"
                    onChange={(e) =>
                      handleTabularChange(
                        e,
                        "items",
                        index,
                        handleProductDetailsChange
                      )
                    }
                    value={data["items"][index]["packing_charges"]}
                    error={errors[""]}
                  />
                </div>
                <div className="grid grid-1x2">
                  <Input
                    name="total"
                    type="number"
                    placeholder="Total"
                    onChange={(e) => handleTotalChange(e, index)}
                    value={data["items"][index]["total"]}
                    error={errors[""]}
                  />
                  <Input
                    name="total_with_tax"
                    type="number"
                    placeholder="Total incl. tax"
                    onChange={(e) => handleTabularChange(e, "items", index)}
                    value={data["items"][index]["total_with_tax"]}
                    error={errors[""]}
                  />
                </div>
              </div>
              <p className="product-total">
                Total: {currency?.symbol}
                {data["items"][index]["total"].toFixed(2)} | Total Tax:{" "}
                {currency?.symbol}
                {(
                  data["items"][index]["total_with_tax"] -
                  data["items"][index]["total"]
                ).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="product-total">
            <h4>
              Total: {currency?.symbol}
              {data.items
                .reduce(
                  (a: number, b: InvoiceItem) => (a += b.total ? b.total : 0),
                  0
                )
                .toFixed(2)}{" "}
              | Total Tax: {currency?.symbol}
              {(
                data.items.reduce(
                  (a: number, b: InvoiceItem) =>
                    (a += b.total_with_tax ? b.total_with_tax : 0),
                  0
                ) -
                data.items.reduce(
                  (a: number, b: InvoiceItem) => (a += b.total ? b.total : 0),
                  0
                )
              ).toFixed(2)}{" "}
              | Grand Total: {currency?.symbol}
              {data.items
                .reduce(
                  (a: number, b: InvoiceItem) =>
                    (a += b.total_with_tax ? b.total_with_tax : 0),
                  0
                )
                .toFixed(2)}
            </h4>
            <button
              type="button"
              onClick={handleAddProduct}
              className="btn-primary btn-flex"
            >
              <IoIosAdd size={20} color="white" />
              Add more
            </button>
          </div>
          <button className="btn-submit btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default InvoiceForm;
