import { AppDispatch } from "../../store/configureStore";
import { CloseSVG } from "../common/SVG";
import { Transport, transportForm } from "../../models/transports";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import {
  addTransport,
  getFailedRequestError,
  updateTransport,
} from "../../store/entities/transports";

const schema = z.object({
  name: z
    .string()
    .max(255, "Name must be less than 255 characters")
    .min(1, "Name is required"),
  transporter_id: z
    .string()
    .max(55, "Transporter ID must be less than 55 characters"),
  mode: z
    .string()
    .min(1, "Mode of transport is required")
    .max(55, "Mode of transport must be less than 55 characters"),
});

interface Props {
  transport?: Transport;
}

function TransportForm({ transport }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const dialog = useRef<HTMLDialogElement>(null);
  const { data, setData, errors, handleChange, handleSubmit } = useForm(
    transportForm.initialState
  );

  const handleClose = () => {
    document.querySelector("dialog")?.close();
  };

  const onSubmit = () => {
    if (transport) dispatch(updateTransport(data.id!.toString(), data));
    else dispatch(addTransport(data));

    if (failedAPIRequestError) return;

    setData(transportForm.initialState);
    dialog.current?.close();
  };

  return (
    <dialog ref={dialog}>
      <button onClick={handleClose} className="btn-icon dialog-close">
        <CloseSVG />
      </button>
      <form
        onSubmit={(e) => handleSubmit(e, schema, onSubmit)}
        action=""
        className="form-dialog"
      >
        <h3 className="form-dialog-heading">Transport</h3>

        {transportForm.inputs.map((input) => (
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

export default TransportForm;
