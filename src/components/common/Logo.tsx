import React from "react";
import { useSelector } from "react-redux";
import { getLogoURL } from "../../store/user-info/firm";

interface Props {
  className?: string;
}

function Logo({ className = "nav-logo" }: Props) {
  const logoURL = useSelector(getLogoURL);

  return logoURL ? (
    <img className={className + " logo"} src={logoURL} alt="" />
  ) : (
    <div></div>
  );
}

export default Logo;
