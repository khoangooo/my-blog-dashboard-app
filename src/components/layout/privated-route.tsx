import { getLocalData } from "@/utils/token";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivatedRoute({ children }: PropsWithChildren) {
  const token = getLocalData("token") as string;
  const remember = getLocalData("remember") as string;
  const location = useLocation();

  if (!token || remember === "0") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return <>{children}</>;
}

export default PrivatedRoute;