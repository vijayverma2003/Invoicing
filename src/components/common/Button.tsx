import { Link } from "react-router-dom";

interface buttonProps {
  children: string;
  className?: string;
  href?: string;
}

function Button({ children, className, href }: buttonProps): JSX.Element {
  return (
    <div className={`btn-container ${className}`}>
      {href ? (
        <Link className="btn" to={href}>
          <button>{children}</button>
        </Link>
      ) : (
        <button>{children}</button>
      )}
    </div>
  );
}

export default Button;
