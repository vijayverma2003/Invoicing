import { Link } from "react-router-dom";
import Input from "../common/Input";
import useForm from "../../hooks/useForm";
import { registerForm } from "../../models/user";
import { z } from "zod";

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
    .min(8, "Password must be atleast 8 characters long"),
});

function RegisterForm() {
  const { data, setData, errors, handleChange, handleSubmit } = useForm(
    registerForm.initialState
  );

  const onSubmit = () => {};

  return (
    <section className="form-page">
      <div className="form-container">
        <form
          onSubmit={(e) => handleSubmit(e, schema, onSubmit)}
          className="form-primary"
        >
          <h2 className="form-heading">Register</h2>

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
