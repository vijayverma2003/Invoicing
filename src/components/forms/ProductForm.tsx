import useForm from "../../hooks/useForm";
import { productFormModel } from "../../models/models";
import Input from "../common/Input";
import { CloseSVG } from "../common/SVG";

function ProductForm(): JSX.Element {
  const { name, unit, cost, tax, hsn } = productFormModel.model;
  const { state, handleChange } = useForm(productFormModel.initialState);
  const [data] = state;

  const handleClose = () => {
    document.querySelector("dialog")?.close();
    console.log(document.querySelector("dialog")?.open);
  };

  return (
    <dialog>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>
      <form action="" className="form-dialog">
        <h3 className="form-dialog-heading">Product</h3>
        <Input {...name} value={data.name} onChange={handleChange} />
        <Input {...cost} value={data.cost} onChange={handleChange} />
        <Input {...unit} value={data.unit} onChange={handleChange} />
        <Input {...tax} value={data.tax} onChange={handleChange} />
        <Input {...hsn} value={data.hsn} onChange={handleChange} />
        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default ProductForm;
