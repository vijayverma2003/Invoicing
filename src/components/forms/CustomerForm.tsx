import { useForm } from "react-hook-form";
import Input from "../common/Input";
import { CloseSVG } from "../common/SVG";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
});

const requiredSchema = schema.required({
  name: true,
  phone: true,
  email: true,
  city: true,
  state: true,
});

type FormData = z.infer<typeof schema>;

function CustomerForm(): JSX.Element {
  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ resolver: zodResolver(requiredSchema) });

  const name = register("name");
  const email = register("email");
  const phone = register("phone");
  const street = register("street");
  const city = register("city");
  const state = register("state");

  return (
    <dialog>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        action=""
        className="form-dialog"
      >
        <h3 className="form-dialog-heading">Customer</h3>
        <Input
          name={name.name}
          onChange={name.onChange}
          onBlur={name.onBlur}
          inputRef={name.ref}
          placeholder="Name"
          type="text"
          error={errors.name}
        />

        <Input
          name={email.name}
          onChange={email.onChange}
          onBlur={email.onBlur}
          inputRef={email.ref}
          placeholder="Email"
          type="email"
          error={errors.email}
        />

        <Input
          name={phone.name}
          onChange={phone.onChange}
          onBlur={phone.onBlur}
          inputRef={phone.ref}
          placeholder="Phone"
          type="text"
          error={errors.phone}
        />

        <Input
          name={street.name}
          onChange={street.onChange}
          onBlur={street.onBlur}
          inputRef={street.ref}
          placeholder="Street"
          type="text"
          error={errors.street}
        />

        <Input
          name={city.name}
          onChange={city.onChange}
          onBlur={city.onBlur}
          inputRef={city.ref}
          placeholder="City"
          type="text"
          error={errors.city}
        />

        <Input
          name={state.name}
          onChange={state.onChange}
          onBlur={state.onBlur}
          inputRef={state.ref}
          placeholder="State"
          type="text"
          error={errors.state}
        />

        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default CustomerForm;
