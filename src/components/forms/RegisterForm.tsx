import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { login, register } from "../../services/auth";
import { User, registerForm } from "../../models/user";
import { z } from "zod";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";

const schema = z.object({
  username: z
    .string()
    .max(150, "Username must be less than 150 characters")
    .min(1, "Username is required"),
  email: z
    .string()
    .email("Invalid Email")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .max(55, "Username must be less than 150 characters")
    .min(6, "Password must be atleast 8 characters long"),
});

function RegisterForm() {
  const { data, errors, setErrors, handleChange, handleSubmit } = useForm<User>(
    registerForm.initialState
  );

  const onSubmit = async () => {
    try {
      await register(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const copiedErrors = { ...errors };

        if (error.response)
          for (let err in error.response.data)
            copiedErrors[err] = error.response.data[err][0];
        setErrors(copiedErrors);
      }
    }

    try {
      await login(data);
    } catch (error) {
      window.location.href = "/login";
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
          <h3 className="form-heading">Register</h3>

          {registerForm.inputs.map((input) => (
            <Input
              key={input.name}
              {...input}
              onChange={handleChange}
              error={errors[input.name]}
            />
          ))}

          <button className="btn-submit btn-primary">Register</button>
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
