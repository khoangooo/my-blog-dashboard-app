import { retrieveData } from "@/utils/token";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivatedRoute({ children }: PropsWithChildren) {
  const token = retrieveData("token") as string;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return <>{children}</>;
}

export default PrivatedRoute;