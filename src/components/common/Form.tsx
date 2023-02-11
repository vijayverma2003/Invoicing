import React, { useState } from "react";
import { InputInterface } from "../../models/login";
import Button from "./Button";
import Input from "./Input";

type Data = {
  [key: string]: any;
};

function Form({ inputs, state }: { inputs: InputInterface[]; state: Data }) {
  const [data, setData] = useState(state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = { ...data };
    d[e.target.name] = e.target.value;
    setData(d);
  };

  return (
    <>
      {inputs.map((input: any) => (
        <Input
          key={input.name}
          name={input.name}
          placeholder={input.placeholder}
          svg={input.svg}
          type={input.type}
          value={data[input.name]}
          onChange={handleChange}
        />
      ))}

      <Button className="form-button">Login</Button>
    </>
  );
}

export default Form;
