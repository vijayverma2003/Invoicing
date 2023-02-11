import { InputInterface } from "../../models/login";
import emailSVG from "../../svg/email.svg";
import Form from "../common/Form";
import passwordSVG from "../../svg/password.svg";

function LoginForm() {
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
        <h2 className="text-gradient login-heading">Login</h2>
        <Form state={data} inputs={inputs} />
        <p className="login-description">
          Don't have an account?{" "}
          <a href="#" className="link-primary">
            Register
          </a>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
