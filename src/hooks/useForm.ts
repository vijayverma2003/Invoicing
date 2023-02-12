import React, { useEffect, useState } from "react";
import { InputInterface } from "../models/form";

interface Model {
  [key: string]: InputInterface;
}

interface Data {
  [key: string]: any;
}

function useForm(initialState: Data, model: Model) {
  const [data, setData] = useState<Data>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = { ...data };
    d[e.target.name] = e.target.value;
    setData(d);
  };

  return { state: [data, setData], handleChange };
}

export default useForm;
