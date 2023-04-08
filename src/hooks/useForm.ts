import { ZodSchema } from "zod";
import React, { useState } from "react";

interface Data {
  [key: string]: any;
}
interface Errors {
  [key: string]: string | undefined;
}

function useForm<T>(initialState: T) {
  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d: Data = { ...data } as Data;
    const { name, value, type } = e.target;

    if (d[name]) {
      d[name] = value as string;
    }
    if (type === "number") d[name] = parseInt(d[name]);

    setData(d as T);
  };

  const handleTabularChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    arr: string,
    index: number
  ) => {
    const d: Data = { ...data } as Data;
    d[arr][index][e.target.name] = e.target.value;
    setData(d as T);
  };

  const handleSubmit = (
    e: React.FormEvent,
    schema: ZodSchema,
    onSubmit: () => void
  ) => {
    e.preventDefault();

    const result = schema.safeParse(data);
    if (!result.success) {
      const updatedErrors = { ...errors };

      for (let issue of result.error.issues)
        updatedErrors[issue.path[0]] = issue.message;

      setErrors(updatedErrors);

      return;
    }

    onSubmit();
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    handleTabularChange,
    setData,
    setErrors,
  };
}

export default useForm;
