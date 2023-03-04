import { useNavigate } from "react-router-dom";

interface buttonProps {
  children: string;
  className?: string;
  href?: string;
  [key: string]: any;
}

function Button({
  children,
  className,
  href,
  type = "button",
  ...props
}: buttonProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) navigate(href);
  };

  return (
    <div className={`btn-container ${className}`}>
      <button {...props} type={type} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
