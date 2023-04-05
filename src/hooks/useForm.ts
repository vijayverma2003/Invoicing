import React, { useState } from "react";

interface Data {
  [key: string]: any;
}
interface Errors {
  [key: string]: string | undefined;
}

function useForm(initialState: Data) {
  const [data, setData] = useState<Data>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = { ...data };
    const { name, value, type } = e.target;

    d[name] = value;
    if (type === "number") d[name] = parseInt(d[name]);

    setData(d);
  };

  const handleTabularChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    arr: string,
    index: number
  ) => {
    const d = { ...data };
    d[arr][index][e.target.name] = e.target.value;
    setData(d);
  };

  return {
    data,
    setData,
    errors,
    setErrors,
    handleChange,
    handleTabularChange,
  };
}

export default useForm;
