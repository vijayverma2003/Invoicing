import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { login } from "../../services/auth";
import { LoginFields, loginForm } from "../../models/user";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

const schema = z.object({
  username: z
    .string()
    .max(150, "Username must be less than 150 characters")
    .min(1, "Username is required"),
  password: z
    .string()
    .max(55, "Username must be less than 150 characters")
    .min(6, "Password must be atleast 8 characters long"),
});

function LoginForm() {
  const { data, errors, setErrors, handleChange, handleSubmit } =
    useForm<LoginFields>(loginForm.initialState);

  const onSubmit = async () => {
    try {
      await login(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const copiedErrors = { ...errors };

        if (error.response)
          for (let err in error.response.data)
            copiedErrors[err] = error.response.data[err][0];
        setErrors(copiedErrors);
      }
    }

    window.location.href = "/firm";
  };

  return (
    <section className="form-page">
      <div className="form-container">
        <form
          onSubmit={(e) => handleSubmit(e, schema, onSubmit)}
          className="form-primary"
        >
          <h2 className="form-heading">Login</h2>

          {loginForm.inputs.map((input) => (
            <Input
              key={input.name}
              {...input}
              onChange={handleChange}
              error={errors[input.name]}
            />
          ))}

          <button className="btn-primary btn-submit">Login</button>
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
