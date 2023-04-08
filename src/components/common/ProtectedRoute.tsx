import { ReactNode } from "react";
import { getUserID } from "../../services/auth";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  replace?: boolean;
}

function ProtectedRoute({ children, replace }: Props) {
  if (!getUserID()) return <Navigate to="/login" replace />;

  if (getUserID() && replace) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
