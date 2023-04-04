import { CloseSVG } from "../common/SVG";
import { transportFormModel } from "../../models/models";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

function TransportForm(): JSX.Element {
  const { name, transporter_id, mode } = transportFormModel.model;
  // const { state, handleChange } = useForm(transportFormModel.initialState);
  // const [data] = state;

  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  return (
    <dialog>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>
      <form action="" className="form-dialog">
        <h3 className="form-dialog-heading">Transport</h3>
        {/* <Input {...name} value={data.name} onChange={handleChange} />
        <Input
          {...transporter_id}
          value={data.transporter_id}
          onChange={handleChange}
        />
        <Input {...mode} value={data.mode} onChange={handleChange} /> */}
        <button className="btn btn-submit btn-primary">Create</button>
      </form>
    </dialog>
  );
}

export default TransportForm;
