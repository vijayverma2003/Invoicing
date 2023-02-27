import useForm from "../../hooks/useForm";
import { Input as InputInterface, productFormModel } from "../../models/models";
import Input from "../common/Input";
import { CloseSVG } from "../common/SVG";

function ProductForm(): JSX.Element {
  const { state, handleChange } = useForm(productFormModel.initialState);
  const [data] = state;

  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  return (
    <dialog>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>
      <form action="" className="form-dialog">
        <h3 className="form-dialog-heading">Product</h3>
        {productFormModel.model.map((field: InputInterface) => (
          <Input
            key={field.name}
            {...field}
            value={data[field.name]}
            onChange={handleChange}
          />
        ))}
        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default ProductForm;
