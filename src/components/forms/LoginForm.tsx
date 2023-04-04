import { Link } from "react-router-dom";
import { loginAndRegisterFormModel as lf } from "../../models/models";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

function LoginForm() {
  const { email, password } = lf.model;
  // const { state, handleChange } = useForm(lf.initialState);
  // const [data] = state;

  return (
    <section className="form-page">
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("user", "1");
            window.location.assign("/");
          }}
          className="form-primary"
        >
          <h2 className="text-gradient form-heading">Login</h2>
          {/* <Input {...email} value={data.email} onChange={handleChange} />
          <Input {...password} value={data.password} onChange={handleChange} /> */}
          <div className="btn-container btn-submit">
            <button>Login</button>
          </div>
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
