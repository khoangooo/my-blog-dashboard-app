import { AuthContext } from "@/context";
import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";

function PermissionRequired({ children }: PropsWithChildren) {
  const { user }: any = useContext(AuthContext);

  if (user) {
    return <>{children}</>
  }

  return <Navigate to="/login" replace />;
}

export default PermissionRequired;