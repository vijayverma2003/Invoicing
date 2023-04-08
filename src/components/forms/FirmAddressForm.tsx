import useForm from "../../hooks/useForm";
import Input from "../common/Input";
import { FirmAddress, firmAddressForm } from "../../models/firm-address";

function FirmAddressForm() {
  const { data, errors, handleSubmit, handleChange } = useForm<FirmAddress>(
    firmAddressForm.initialState
  );

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h3 className="form-heading">Firm Address</h3>

          {firmAddressForm.inputs.map((input) => (
            <Input
              {...input}
              error={errors[input.name]}
              onChange={handleChange}
            />
          ))}

          <button className="btn-primary btn-submit">Add</button>
        </form>
      </div>
    </section>
  );
}

export default FirmAddressForm;
