import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { Invoice, InvoiceItem, invoiceForm } from "../../models/invoice";
import Input from "../common/Input";
import Select from "../common/Select";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { getProducts, loadProducts } from "../../store/entities/products";
import { getCustomers, loadCustomers } from "../../store/entities/customers";
import { getTransports, loadTransports } from "../../store/entities/transports";
import { Customer } from "../../models/customers";
import { showAddress } from "../../services/utils";
import { getFirm, loadFirm } from "../../store/user-info/firm";
import { IoIosAdd } from "react-icons/io";

function InvoiceForm() {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();

  const dispatch = useDispatch<AppDispatch>();

  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    setData,
    handleTabularChange,
  } = useForm<Invoice>(invoiceForm.initialState);

  const transports = useSelector(getTransports);
  const customers = useSelector(getCustomers);
  const products = useSelector(getProducts);
  const firm = useSelector(getFirm);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCustomers());
    dispatch(loadTransports());
    dispatch(loadFirm());
  }, [dispatch]);

  useEffect(() => {
    if (firm && firm.id) setData({ ...data, firm: firm.id });
  }, [firm]);

  useEffect(() => {
    if (data.customer) {
      const customer = customers.findIndex(
        (customer) => customer.id === parseInt(data.customer)
      );
      setCurrentCustomer(customers[customer]);
    }
  }, [data.customer]);

  const handleAddProduct = () => {
    const invoice = { ...data };
    invoice.items.push({
      product: "",
      price: "",
      discount: "",
      packing_charges: "",
    });
    setData(invoice);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h4 className="page-heading">New Invoice</h4>
      </div>
      <div className="page-content">
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
            placeholder="Date"
            onChange={handleChange}
            value={data["due_date"]}
            error={errors["due_date"]}
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
        <h3 className="form-heading">Products</h3>
        {data.items.map((item: InvoiceItem, index: number) => (
          <div key={index} className="grid grid-1x4 grid-center">
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
                type="text"
                placeholder="Price"
                onChange={(e) => handleTabularChange(e, "items", index)}
                value={data["items"][index]["price"]}
                error={errors[""]}
              />
              <Input
                name="quantity"
                type="text"
                placeholder="Quantity"
                onChange={(e) => handleTabularChange(e, "items", index)}
                value={data["items"][index]["quantity"]}
                error={errors[""]}
              />
            </div>
            <div className="grid grid-1x2">
              <Input
                name="discount"
                type="text"
                placeholder="Discount"
                onChange={(e) => handleTabularChange(e, "items", index)}
                value={data["items"][index]["discount"]}
                error={errors[""]}
              />
              <Input
                name="packing_charges"
                type="text"
                placeholder="Pkg. Charges"
                onChange={(e) => handleTabularChange(e, "items", index)}
                value={data["items"][index]["packing_charges"]}
                error={errors[""]}
              />
            </div>
          </div>
        ))}
        <div className="product-total">
          <h4>Total: 100</h4>
          <button
            onClick={handleAddProduct}
            className="btn-primary btn-flex mt-high"
          >
            <IoIosAdd size={20} color="white" />
            Add more
          </button>
        </div>
      </div>

      <button>Add more</button>
    </section>
  );
}

export default InvoiceForm;
