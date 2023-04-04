import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { firmAddressFormModel } from "../../models/models";
import Button from "../common/Button";
import Input from "../common/Input";

function FirmAddressForm() {
  const {
    street,
    city,
    state: addressState,
    country,
  } = firmAddressFormModel.model;

  const { state, handleChange } = useForm(firmAddressFormModel.initialState);
  const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h2 className="text-gradient form-heading">Firm Address</h2>
          {/* <Input {...street} value={data.street} onChange={handleChange} />
          <Input {...city} value={data.city} onChange={handleChange} />
          <Input {...addressState} value={data.state} onChange={handleChange} />
          <Input {...country} value={data.country} onChange={handleChange} /> */}
          <Button className="btn-submit" href="/firm/bank">
            Add
          </Button>
        </form>
      </div>
    </section>
  );
}

export default FirmAddressForm;
