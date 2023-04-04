import { CloseSVG } from "../common/SVG";
// import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import { productForm } from "../../models/products";
import { error } from "console";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters long.")
    .max(255, "Name must be less than 255 characters."),
  price: z.number({ invalid_type_error: "Price is required" }),
  tax: z
    .number({ invalid_type_error: "Tax is required" })
    .max(100, "Tax can't be greater than 100%"),
  unit: z
    .string()
    .min(1, "Unit is required")
    .max(3, "Unit must be less than 3 characters"),
  hsn: z.string().max(10, "HSN must be less than 10 characters"),
});

const requiredSchema = schema.required({
  name: true,
  price: true,
  tax: true,
  unit: true,
});

function ProductForm(): JSX.Element {
  const { data, setData, handleChange, errors, setErrors } = useForm(
    productForm.initialState,
    requiredSchema
  );

  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = requiredSchema.safeParse(data);
    if (!result.success) {
      const updatedErrors = { ...errors };
      console.log(result.error.issues);
      for (let issue of result.error.issues) {
        console.log(issue);
        updatedErrors[issue.path[0]] = issue.message;
      }

      console.log(updatedErrors);

      setErrors(updatedErrors);
    }

    console.log(errors);
  };

  return (
    <dialog>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>

      <form onSubmit={handleSubmit} className="form-dialog">
        <h3 className="form-dialog-heading">Product</h3>

        {productForm.inputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            onChange={handleChange}
            error={errors[input.name]}
          />
        ))}

        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default ProductForm;
