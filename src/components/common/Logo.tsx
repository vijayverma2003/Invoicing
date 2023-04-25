import React from "react";

interface Props {
  className?: string;
}

function Logo({ className = "nav-logo" }: Props) {
  return (
    <img
      className={className}
      src={`http://127.0.0.1:8000/media/invoicing/images/Document_5_xuy1oOV.png`}
      alt=""
    />
  );
}

export default Logo;
