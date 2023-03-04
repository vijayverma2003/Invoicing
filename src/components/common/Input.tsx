import gsap from "gsap";
import { useEffect, useRef } from "react";

interface inputProps {
  svg?: string;
  placeholder: string;
  name: string;
  type: string;
  value: number | string;
  [property: string]: any;
}

function Input({
  svg,
  placeholder,
  name,
  type,
  value,
  label,
  ...args
}: inputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

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
  const handleFocusOut = () => {
    if (!inputRef.current?.value)
      gsap.to(labelRef.current, {
        top: "50%",
        left: "0",
        fontSize: "1.6rem",
        duration: 0.2,
        ease: "Power3.easeOut",
      });
  };

  return (
    // {label && <label htmlFor={name}>{placeholder}</label>}
    <div className="input-container">
      {svg && <img className="input-img" src={svg} alt="" />}
      {!svg && (
        <label ref={labelRef} htmlFor={name}>
          {placeholder}
        </label>
      )}
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleFocusOut}
        autoComplete="off"
        placeholder={svg ? placeholder : ""}
        type={type}
        name={name}
        value={value}
        {...args}
      />
    </div>
  );
}

export default Input;
