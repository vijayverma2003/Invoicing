import { Link, useNavigate } from "react-router-dom";

interface buttonProps {
  children: string;
  className?: string;
  href?: string;
}

function Button({ children, className, href }: buttonProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) navigate(href);
  };

  return (
    <div className={`btn-container ${className}`}>
      <button onClick={handleClick}>{children}</button>
    </div>
  );
}

export default Button;
