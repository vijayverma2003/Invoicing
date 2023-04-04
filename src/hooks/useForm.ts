import React, { useState } from "react";
import { z } from "zod";

interface Data {
  [key: string]: any;
}
interface Errors {
  [key: string]: string | undefined;
}

function useForm(initialState: Data, schema: z.Schema) {
  const [data, setData] = useState<Data>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = { ...data };
    d[e.target.name] = e.target.value;

    const result = schema.safeParse(data);
    if (!result.success) {
      console.log(result.error.issues);
    }

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
