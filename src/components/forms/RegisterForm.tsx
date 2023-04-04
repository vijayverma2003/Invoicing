import { Link } from "react-router-dom";
import { loginAndRegisterFormModel as lf } from "../../models/models";
import Button from "../common/Button";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

function RegisterForm() {
  const { state, handleChange } = useForm(lf.initialState);
  const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h2 className="text-gradient form-heading">Register</h2>
          {/* <Input
            {...lf.model.email}
            value={data.email}
            onChange={handleChange}
          />
          <Input
            {...lf.model.password}
            value={data.password}
            onChange={handleChange}
          /> */}
          <Button className="btn-submit" href="/firm">
            Register
          </Button>
        </form>
        <p className="form-description">
          Already have an account?{" "}
          <Link to="/login" className="link-primary">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterForm;
