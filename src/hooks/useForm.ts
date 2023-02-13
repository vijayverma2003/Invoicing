import React, { useState } from "react";

interface Data {
  [key: string]: any;
}

function useForm(initialState: Data) {
  const [data, setData] = useState<Data>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = { ...data };
    d[e.target.name] = e.target.value;
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

  return { state: [data, setData], handleChange, handleTabularChange };
}

export default useForm;
