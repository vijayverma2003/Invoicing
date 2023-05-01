import { ZodSchema } from "zod";
import React, { useState } from "react";

interface Data {
  [key: string]: any;
}
interface Errors {
  [key: string]: string | undefined;
}

function useForm<T>(initialState: T | Data) {
  const [data, setData] = useState<T | Data>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
  ) => {
    const d = { ...data } as Data;
    const { name, value, type } = e.target;

    d[name] = value as string;
    if (type === "number") d[name] = parseInt(d[name]);

    setData(d);
    if (onChange) onChange(e);
  };

  const handleTabularChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    arr: string,
    index: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  ) => {
    const d: Data = { ...data } as Data;
    d[arr][index][e.target.name] = e.target.value;

    if (e.target.type === "number")
      d[arr][index][e.target.name] = e.target.value
        ? parseFloat(e.target.value)
        : "";

    setData(d as T);
    if (onChange) onChange(e as React.ChangeEvent<HTMLInputElement>, index);
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
