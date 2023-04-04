import gsap from "gsap";
import { useEffect, useRef } from "react";
import { FieldError } from "react-hook-form";

interface inputProps {
  svg?: string;
  placeholder: string;
  name: string;
  type: string;
  error: FieldError | undefined;
  [property: string]: any;
}

function Input({
  inputRef,
  svg,
  placeholder,
  name,
  type,
  label,
  error,
  ...args
}: inputProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current?.value) {
      inputRef.current.focus();
    }
  }, [inputRef.current?.value]);

  const handleFocus = () => {
    gsap.to(labelRef.current, {
      top: "-12%",
      left: "-2.5%",
      fontSize: "1rem",
      duration: 0.2,
      ease: "Power3.easeOut",
    });
  };

  return (
    <>
      <div className="input-container">
        {svg && <img className="input-img" src={svg} alt="" />}
        {!svg && (
          <label ref={labelRef} htmlFor={name}>
            {placeholder}
          </label>
        )}
        <input
          {...args}
          ref={inputRef}
          onFocus={handleFocus}
          autoComplete="off"
          placeholder={svg ? placeholder : ""}
          type={type}
          name={name}
        />
      </div>
      {error && (
        <span className="input-error">
          <i>{error.message}</i>
        </span>
      )}
    </>
  );
}

export default Input;
