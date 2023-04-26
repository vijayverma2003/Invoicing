import { AppDispatch } from "../../store/configureStore";
import { firmForm } from "../../models/firm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import {
  addFirm,
  getFailedRequestError,
  getFirm,
  updateFirm,
} from "../../store/user-info/firm";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters")
    .max(255, "Name must be less than 255 characters"),
});

function FirmForm() {
  const dispatch = useDispatch<AppDispatch>();
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const firm = useSelector(getFirm);
  const { data, handleChange, errors, handleSubmit, setData } = useForm(
    firm ?? firmForm.initialState
  );

  useEffect(() => {
    if (firm) setData(firm);
  }, [firm, setData]);

  const onSubmit = () => {
    if (firm) dispatch(updateFirm(data.id!.toString(), data));
    else dispatch(addFirm(data));

    if (failedAPIRequestError) return;

    if (firm) window.location.href = "/";
    else window.location.href = "/firm/address";
  };

  return (
    <section className="form-page">
      <div className="form-container">
        <form
          onSubmit={(e) => handleSubmit(e, schema, onSubmit)}
          className="form-primary"
        >
          <h3 className="form-heading">Your Firm</h3>

          {firmForm.inputs.map((input) => (
            <Input
              key={input.name}
              {...input}
              value={data[input.name]}
              onChange={handleChange}
              error={
                errors[input.name] ||
                (failedAPIRequestError &&
                  failedAPIRequestError[input.name] &&
                  failedAPIRequestError[input.name][0]) ||
                (failedAPIRequestError && failedAPIRequestError["error"])
              }
            />
          ))}

          <button className="btn-primary btn-submit">
            {firm ? "Update" : "Create"}
          </button>
        </form>
        <p className="form-end text-center">
          <Link className="link-primary" to="/firm/address">
            <strong>Update firm address</strong>
          </Link>
        </p>
      </div>
    </section>
  );
}

export default FirmForm;
