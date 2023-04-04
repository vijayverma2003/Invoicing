import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { bankFormModel } from "../../models/models";
import Button from "../common/Button";
import Input from "../common/Input";

function BankForm() {
  const { name, ifsc, acc, branch } = bankFormModel.model;

  // const { state, handleChange } = useForm(bankFormModel.initialState);
  // const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h2 className="text-gradient form-heading">Bank Details</h2>
          {/* <Input {...name} value={data.name} onChange={handleChange} />
          <Input {...acc} value={data.acc} onChange={handleChange} />
          <Input {...ifsc} value={data.ifsc} onChange={handleChange} />
          <Input {...branch} value={data.branch} onChange={handleChange} /> */}
          <Button className="btn-submit" href="/">
            Add
          </Button>
        </form>
        <Link to="/" className="link-primary">
          <p className="form-description">Skip for now</p>
        </Link>
      </div>
    </section>
  );
}

export default BankForm;
