import { CloseSVG } from "../common/SVG";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters long.")
    .max(255, "Name must be less than 255 characters."),
  price: z.number({ invalid_type_error: "Price is required" }),
  tax: z
    .number({ invalid_type_error: "Tax is required" })
    .max(100, "Tax can't be greater than 100%"),
  unit: z.string().max(3, "Unit must be less than 3 characters"),
  hsn: z.string().max(10, "HSN must be less than 10 characters"),
});

const required = schema.required({
  name: true,
  price: true,
  tax: true,
  unit: true,
});

type FormData = z.infer<typeof schema>;

function ProductForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(required),
  });

  const name = register("name");
  const price = register("price", { valueAsNumber: true });
  const tax = register("tax", { valueAsNumber: true });
  const hsn = register("hsn");
  const unit = register("unit");

  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  return (
    <dialog>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          reset();
        })}
        action=""
        className="form-dialog"
      >
        <h3 className="form-dialog-heading">Product</h3>

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
          name={price.name}
          onChange={price.onChange}
          onBlur={price.onBlur}
          inputRef={price.ref}
          placeholder="Price"
          type="number"
          error={errors.price}
        />

        <Input
          name={tax.name}
          onChange={tax.onChange}
          onBlur={tax.onBlur}
          inputRef={tax.ref}
          placeholder="Tax"
          type="number"
          error={errors.tax}
        />

        <Input
          name={unit.name}
          onChange={unit.onChange}
          onBlur={unit.onBlur}
          inputRef={unit.ref}
          placeholder="Unit"
          type="text"
          error={errors.unit}
        />

        <Input
          name={hsn.name}
          onChange={hsn.onChange}
          onBlur={hsn.onBlur}
          inputRef={hsn.ref}
          placeholder="HSN/SAC"
          type="text"
          error={errors.hsn}
        />

        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default ProductForm;
