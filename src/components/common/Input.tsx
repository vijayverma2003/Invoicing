import { FieldError } from "react-hook-form";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface InputProps {
  error: string | FieldError | undefined | null;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  svg?: string;
  type: string;
  [property: string]: any;
}

const Input = ({
  svg,
  placeholder,
  name,
  type,
  label,
  error,
  onChange,
  ...args
}: InputProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const input = useRef<HTMLInputElement | null>(null);

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

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement, Element>) => {
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
    if (input.current?.value)
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
    <div className="input-container-wrapper">
      <div className="input-container">
        {svg && <img className="input-img" src={svg} alt="" />}
        {!svg && (
          <label ref={labelRef} htmlFor={name}>
            {placeholder}
          </label>
        )}
        <input
          {...args}
          ref={input}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={(e) => handleFocusOut(e)}
          autoComplete="off"
          placeholder={svg ? placeholder : ""}
          type={type}
          name={name}
          id={name}
        />
      </div>
      {error && (
        <span className="input-error">
          <i>{error.toString()}</i>
        </span>
      )}
    </div>
  );
};
export default Input;
