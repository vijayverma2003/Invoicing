import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { firmFormModel } from "../../models/models";
import Button from "../common/Button";
import Input from "../common/Input";

function FirmForm() {
  const { name } = firmFormModel.model;

  const { state, handleChange } = useForm(firmFormModel.initialState);
  const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h2 className="text-gradient form-heading">Add your firm</h2>
          {/* <Input {...name} value={data.name} onChange={handleChange} /> */}
          <Button className="btn-submit" href="/firm/address">
            Create
          </Button>
        </form>
      </div>
    </section>
  );
}

export default FirmForm;
