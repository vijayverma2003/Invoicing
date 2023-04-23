import React, { useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { z } from "zod";
import useForm from "../../hooks/useForm";
import Payment, { paymentForm } from "../../models/payment";
import { useDispatch, useSelector } from "react-redux";
import {
  addPayment,
  getFailedRequestError,
} from "../../store/entities/invoices";
import Input from "../common/Input";
import { AppDispatch } from "../../store/configureStore";
import { useParams } from "react-router-dom";

const schema = z.object({});

function PaymentForm() {
  const { id } = useParams();
  const dialog = useRef<HTMLDialogElement>(null);
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const dispatch = useDispatch<AppDispatch>();

  const { handleSubmit, handleChange, data, setData, errors } =
    useForm<Payment>(paymentForm.initialState);

  const onSubmit = () => {
    if (id) dispatch(addPayment(id, data as Payment));
    dialog.current?.close();
  };

  return (
    <dialog id="dialog-payment-form" ref={dialog}>
      <button
        onClick={() => dialog.current?.close()}
        className="btn-icon dialog-close"
      >
        <MdOutlineClose size={20} color="black" />
      </button>

      <form
        onSubmit={(e) => handleSubmit(e, schema, onSubmit)}
        className="form-dialog"
      >
        <h3 className="form-dialog-heading">Payment</h3>

        {paymentForm.inputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            onChange={handleChange}
            value={data[input.name] ?? ""}
            error={
              errors[input.name] ||
              (failedAPIRequestError &&
                failedAPIRequestError[input.name] &&
                failedAPIRequestError[input.name][0])
            }
          />
        ))}

        <button className="btn btn-submit btn-primary">
          {/* {product ? "Update" : "Create"} */}
          Add
        </button>
      </form>
    </dialog>
  );
}

export default PaymentForm;
