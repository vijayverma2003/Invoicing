import { AppDispatch } from "../../store/configureStore";
import { CloseSVG } from "../common/SVG";
import { Product, productForm } from "../../models/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import {
  addProduct,
  getFailedRequestError,
  updateProduct,
} from "../../store/entities/products";

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

interface Props {
  product?: Product;
}

function ProductForm({ product }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const dialog = useRef<HTMLDialogElement>(null);
  const failedAPIRequestError = useSelector(getFailedRequestError);

  const { data, setData, handleChange, errors, handleSubmit, setErrors } =
    useForm<Product>(productForm.initialState);

  const handleAddProduct = () => {
    if (!product) dispatch(addProduct(data));
    else dispatch(updateProduct(data.id!.toString(), data));

    if (failedAPIRequestError) return;

    setData(productForm.initialState);
    dialog.current?.close();
  };

  useEffect(() => {
    if (product) setData(product);
  }, [product]);

  return (
    <dialog id="dialog-product-form" ref={dialog}>
      <button
        onClick={() => dialog.current?.close()}
        className="btn-icon dialog-close"
      >
        <CloseSVG />
      </button>

      <form
        onSubmit={(e) => handleSubmit(e, requiredSchema, handleAddProduct)}
        className="form-dialog"
      >
        <h3 className="form-dialog-heading">Product</h3>

        {productForm.inputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            onChange={handleChange}
            error={
              errors[input.name] ||
              (failedAPIRequestError &&
                failedAPIRequestError[input.name] &&
                failedAPIRequestError[input.name][0])
            }
          />
        ))}

        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default ProductForm;
