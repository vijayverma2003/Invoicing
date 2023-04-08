import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { invoiceFormModel } from "../../models/models";
import Input from "../common/Input";
import InvoiceProducts from "./InvoiceProducts";

function InvoiceForm() {
  const [numberOfProducts, setNumberOfProducts] = useState(1);

  // const { state, handleChange, handleTabularChange } = useForm(
  //   invoiceFormModel.initialState
  // );
  // const [data, setData] = state;
  // const { number, date, due_date, customer, transport } =
  //   invoiceFormModel.model;

  const handleAddMoreProduct = () => {
    // let d = { ...data };
    // d.products.push({ name: "", cost: "", qty: "", discount: "" });
    // setNumberOfProducts((n) => ++n);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h4 className="page-heading">New Invoice</h4>
      </div>
      <div className="page-content">
        <div className="grid grid-1x4 mb2">
          {/* <Input onChange={handleChange} {...number} value={data["number"]} />
          <Input onChange={handleChange} {...date} value={data["date"]} />
          <Input
            onChange={handleChange}
            {...due_date}
            value={data["due_date"]}
          />
          <Input
            onChange={handleChange}
            {...transport}
            value={data["transport"]}
          /> */}
        </div>
        <div>
          {/* <h4 className="mb2">Customer</h4> */}
          {/* <Input
            onChange={handleChange}
            {...customer}
            value={data["customer"]}
          /> */}
          <h5>
            <i>59, New Town, Ratia, 🇮🇳</i>
          </h5>
        </div>
        <h3 className="form-heading">Products</h3>
        {/* {Array(numberOfProducts)
          .fill(1)
          .map((i, index) => (
            <div key={index} className="invoice-product-wrapper">
              <h3>{`${index + 1}.`}</h3>
              <InvoiceProducts
                onTabularChange={handleTabularChange}
                data={data}
                index={index}
              />
            </div>
          ))} */}
      </div>
      <button onClick={handleAddMoreProduct}>Add more</button>
    </section>
  );
}

export default InvoiceForm;
