import { Link } from "react-router-dom";
import Button from "../common/Button";

function BankForm() {
  // const { state, handleChange } = useForm(bankFormModel.initialState);
  // const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h2 className="text-gradient form-heading">Bank Details</h2>

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
