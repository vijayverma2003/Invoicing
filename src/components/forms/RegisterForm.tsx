import { InputInterface } from "../../models/login";
import emailSVG from "../../svg/email.svg";
import Form from "../common/Form";
import passwordSVG from "../../svg/password.svg";
import { Link } from "react-router-dom";

function RegisterForm() {
  const data = { email: "", password: "" };

  const inputs: InputInterface[] = [
    {
      name: "email",
      placeholder: "Email Address",
      svg: emailSVG,
      type: "email",
      value: "",
    },
    {
      name: "password",
      placeholder: "Password",
      svg: passwordSVG,
      type: "password",
      value: "",
    },
  ];
  return (
    <section className="page">
      <div className="login">
        <h2 className="text-gradient login-heading">Register</h2>
        <Form button={{ text: "Register" }} state={data} inputs={inputs} />
        <p className="login-description">
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
