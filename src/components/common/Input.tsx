import emailSVG from "../../svg/email.svg";

interface inputProps {
  svg?: string;
  placeholder: string;
  name: string;
  type: string;
  value: number | string;
  [property: string]: any;
}

function Input({ svg, placeholder, name, type, value, ...args }: inputProps) {
  return (
    <div className="input-container">
      {svg && <img className="input-img" src={svg} alt="" />}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        {...args}
      />
    </div>
  );
}

export default Input;
