interface InitialState {
  [key: string]: string;
}

export interface Input<T> {
  name: keyof T;
  placeholder: string;
  type: "text" | "email" | "number" | "date" | "tel" | "password";
}

export default interface Form<T> {
  initialState: T;
  inputs: Input<T>[];
}
