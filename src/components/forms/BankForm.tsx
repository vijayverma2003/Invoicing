import { AppDispatch } from "../../store/configureStore";
import { Bank, bankForm } from "../../models/bank";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import {
  addBankDetails,
  getFirm,
  updateBankDetails,
} from "../../store/user-info/firm";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  acc: z
    .string()
    .min(1, "Account Number is required")
    .max(55, "Account Number must be less than 55 characters"),
  ifsc: z.string().max(55, "IFSC Code must be less than 55 characters"),
  branch: z.string().max(55, "Branch City must be less than 55 characters"),
});

function BankForm() {
  const dispatch = useDispatch<AppDispatch>();
  const firm = useSelector(getFirm);
  const { handleChange, data, setData, errors, handleSubmit } = useForm<Bank>(
    bankForm.initialState
  );

  useEffect(() => {
    if (firm && firm.bank) setData(firm.bank);
  }, [firm, setData]);

  const onSubmit = () => {
    if (firm.id && firm.bank) dispatch(updateBankDetails(firm.id, data));
    else if (firm.id) dispatch(addBankDetails(firm.id, data));
    else window.location.href = "/firm";

    window.location.href = "/";
  };

  return (
    <section className="form-page">
      <div className="form-container">
        <form
          onSubmit={(e) => handleSubmit(e, schema, onSubmit)}
          className="form-primary"
        >
          <h3 className="form-heading">Bank Details</h3>

          {bankForm.inputs.map((input) => (
            <Input
              key={input.name}
              {...input}
              onChange={handleChange}
              value={data[input.name]}
              error={errors[input.name]}
            />
          ))}

          <button className="btn-primary btn-submit">
            {firm && firm.bank ? "Update" : "Add"}
          </button>
        </form>
        {!firm && (
          <Link to="/" className="link-primary form-end">
            <p className="form-description">Skip for now</p>
          </Link>
        )}
      </div>
    </section>
  );
}

export default BankForm;
