import { Customer, customerForm } from "../../models/customers";
import { MdOutlineClose } from "react-icons/md";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../store/common/countries";
import Select from "../common/Select";
import { AppDispatch } from "../../store/configureStore";
import {
  addCustomer,
  getFailedRequestError,
  updateCustomer,
} from "../../store/entities/customers";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name should be atleast 3 characters long")
    .max(255, "Name must be less than 255 characters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(55, "Phone must be less than 55 characters"),
  email: z.string().email().max(55, "Email must be less than 55 characters"),
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
  country: z.string(),
});

const requiredSchema = schema.required({
  name: true,
  phone: true,
  email: true,
  city: true,
  state: true,
  country: true,
});

interface Props {
  customer?: Customer;
}

function CustomerForm({ customer }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(getCountries);
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const dialog = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  const { data, errors, handleChange, handleSubmit, setData } =
    useForm<Customer>(customerForm.initialState);

  useEffect(() => {
    if (customer && typeof customer.country !== "string" && customer.country.id)
      setData({
        ...customer,
        country: customer.country.id.toString(),
      });
  }, [customer]);

  const onSubmit = () => {
    if (customer?.id) dispatch(updateCustomer(customer.id, data));
    else dispatch(addCustomer(data as Customer));

    if (failedAPIRequestError) return;

    setData(customerForm.initialState);
    dialog.current?.close();
  };

  return (
    <dialog ref={dialog} id="dialog-customer-form">
      <button onClick={handleClose} className="btn-icon dialog-close">
        <MdOutlineClose size={20} color="black" />
      </button>

      <form
        onSubmit={(e) => handleSubmit(e, requiredSchema, onSubmit)}
        className="form-dialog"
      >
        <h3 className="form-dialog-heading">Customer</h3>

        {customerForm.inputs.map((input) => {
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

        <button className="btn btn-submit btn-primary">
          {customer ? "Update" : "Create"}
        </button>
      </form>
    </dialog>
  );
}

export default CustomerForm;
