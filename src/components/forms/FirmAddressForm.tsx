import useForm from "../../hooks/useForm";
import Input from "../common/Input";
import { FirmAddress, firmAddressForm } from "../../models/firm-address";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { getFirm, loadFirm } from "../../store/user-info/firm";

const schema = {};

function FirmAddressForm() {
  const dispatch = useDispatch<AppDispatch>();
  const firm = useSelector(getFirm);
  const { errors, handleChange } = useForm<FirmAddress>(
    firmAddressForm.initialState
  );

  useEffect(() => {
    dispatch(loadFirm());
  }, []);

  const onSubmit = () => {
    if (firm) window.location.href = "/bank";
  };

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
