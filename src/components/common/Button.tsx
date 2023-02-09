interface buttonProps {
  children: string;
  className: string;
  href?: string;
}

function Button({ children, className, href }: buttonProps): JSX.Element {
  return (
    <div className={`btn-container ${className}`}>
      {href ? (
        <a className="btn" href={href}>
          <button>{children}</button>
        </a>
      ) : (
        <button>{children}</button>
      )}
    </div>
  );
}

export default Button;
