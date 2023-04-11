import React, { useEffect, useRef } from "react";
import { FieldError } from "react-hook-form";
import gsap from "gsap";

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  error: string | FieldError | null | undefined;
  [property: string]: any;
  options: { [key: string]: any }[];
  args?: React.ReactNode;
}

function Select({
  name,
  placeholder,
  options,
  onChange,
  error,
  value,
  ...args
}: Props) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleFocus = () => {
    gsap.to(labelRef.current, {
      top: "-12%",
      left: "-2.5%",
      fontSize: "1rem",
      opacity: 1,
      duration: 0.2,
      ease: "Power3.easeOut",
    });
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    if (!e.target.value)
      gsap.to(labelRef.current, {
        top: "50%",
        left: "0",
        fontSize: "1.6rem",
        duration: 0.2,
        opacity: 0.4,
        ease: "Power3.easeOut",
      });
  };

  useEffect(() => {
    if (selectRef.current?.value)
      gsap.to(labelRef.current, {
        top: "-12%",
        left: "-2.5%",
        opacity: 1,
        fontSize: "1rem",
        duration: 0.4,
        ease: "Power3.easeOut",
      });
  });

  return (
    <div className="input-container">
      <label ref={labelRef} htmlFor={name}>
        {placeholder}
      </label>
      <select
        onFocus={handleFocus}
        onBlur={handleFocusOut}
        ref={selectRef}
        autoComplete="off"
        {...args}
        onChange={onChange}
        name={name}
        id={name}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.name} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <span className="input-error">
          <i>{error.toString()}</i>
        </span>
      )}
    </div>
  );
}

export default Select;
