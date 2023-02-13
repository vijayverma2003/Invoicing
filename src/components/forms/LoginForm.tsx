import { Link } from "react-router-dom";
import { loginAndRegisterFormModel as lf } from "../../models/models";
import Button from "../common/Button";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

function LoginForm() {
  const { email, password } = lf.model;
  const { state, handleChange } = useForm(lf.initialState);
  const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form className="form-primary">
          <h2 className="text-gradient form-heading">Login</h2>
          <Input {...email} value={data.email} onChange={handleChange} />
          <Input {...password} value={data.password} onChange={handleChange} />
          <Button className="btn-submit" href="/dashboard">
            Login
          </Button>
        </form>
        <p className="form-description">
          Don't have an account?{" "}
          <Link to="/register" className="link-primary">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
