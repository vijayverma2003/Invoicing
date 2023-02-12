import { Link } from "react-router-dom";
import { loginForm as lf } from "../../models/models";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

function LoginForm() {
  const { state, handleChange } = useForm(lf.initialState, lf.model);
  const [data] = state;

  return (
    <section className="form-page">
      <div className="login">
        <h2 className="text-gradient login-heading">Login</h2>
        <Input {...lf.model.email} value={data.email} onChange={handleChange} />
        <Input
          {...lf.model.password}
          value={data.password}
          onChange={handleChange}
        />
        <p className="login-description">
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
