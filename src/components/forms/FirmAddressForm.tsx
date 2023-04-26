import { AppDispatch } from "../../store/configureStore";
import { FirmAddress, firmAddressForm } from "../../models/firm-address";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import {
  addFirmAddress,
  getFailedRequestError,
  getFirm,
  updateFirmAddress,
} from "../../store/user-info/firm";
import { getCountries } from "../../store/common/countries";
import Select from "../common/Select";

const schema = z.object({
  street: z
    .string()
    .max(255, "Street Address must be less than 255 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(55, "City must be less than 55 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(55, "State must be less than 55 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(55, "Country must be less than 255 characters"),
});

const required = schema.required({ city: true, state: true, country: true });

function FirmAddressForm() {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(getCountries);
  const firm = useSelector(getFirm);
  const failedRequestError = useSelector(getFailedRequestError);
  const { errors, handleChange, handleSubmit, data, setData } =
    useForm<FirmAddress>(firmAddressForm.initialState);

  useEffect(() => {
    if (firm && firm.address?.city && firm.address.country)
      setData({
        ...firm.address,
        country:
          typeof firm.address.country !== "string"
            ? firm.address.country.id
              ? firm.address.country.id.toString()
              : firm.address.country.id
            : firm.address.country,
      });
  }, [firm, setData]);

  const onSubmit = () => {
    if (firm.id && firm.address)
      dispatch(updateFirmAddress(firm.id.toString(), data));
    else if (firm.id) dispatch(addFirmAddress(firm.id.toString(), data));

    if (firm.id && firm.address) window.location.href = "/";
    else window.location.href = "/firm/bank";
  };

  return (
    <section className="form-page">
      <div className="form-container">
        <form
          onSubmit={(e) => handleSubmit(e, required, onSubmit)}
          className="form-primary"
        >
          <h3 className="form-heading">Firm Address</h3>

          {firmAddressForm.inputs.map((input) => {
            if (input.elementtype === "select")
              return (
                <Select
                  key={input.name}
                  {...input}
                  onChange={handleChange}
                  options={countries}
                  value={data[input.name]}
                  error={errors[input.name]}
                />
              );

            return (
              <Input
                key={input.name}
                {...input}
                onChange={handleChange}
                error={errors[input.name]}
                value={data[input.name]}
              />
            );
          })}

          <button className="btn-primary btn-submit">
            {firm && firm.address?.city ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default FirmAddressForm;
