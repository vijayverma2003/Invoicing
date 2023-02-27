import useForm from "../../hooks/useForm";
import { customerFormModel } from "../../models/models";
import Input from "../common/Input";
import { CloseSVG } from "../common/SVG";

function CustomerForm(): JSX.Element {
  const {
    name,
    email,
    phone,
    city,
    street,
    state: stateAddress,
  } = customerFormModel.model;

  const { state, handleChange } = useForm(customerFormModel.initialState);
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
        <h3 className="form-dialog-heading">Customer</h3>
        <Input {...name} value={data.name} onChange={handleChange} />
        <Input {...email} value={data.email} onChange={handleChange} />
        <Input {...phone} value={data.phone} onChange={handleChange} />
        <Input {...street} value={data.street} onChange={handleChange} />
        <Input {...city} value={data.city} onChange={handleChange} />
        <Input {...stateAddress} value={data.state} onChange={handleChange} />
        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default CustomerForm;
