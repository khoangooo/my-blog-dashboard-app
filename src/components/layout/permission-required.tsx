import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PermissionRequired({ children }: PropsWithChildren) {
  const token = localStorage.getItem('accessToken')
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default PermissionRequired;