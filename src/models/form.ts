interface InitialState {
  [key: string]: string;
}

interface Input {
  name: string;
  placeholder: string;
  type: "text" | "email" | "number" | "date" | "tel";
}

export default interface Form {
  initialState: InitialState;
  inputs: Input[];
}
