import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "@/context";
import api from "@/utils/api";
import { AuthContextType } from "@/types/auth-context";
import { getLocalData } from "@/utils/token";

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const token = getLocalData("token") as string;

  const getUser = () => {
    setLoading(true)
    api.get("/me")
      .then((res: any) => {
        if (res.status) {
          setUser(res.data);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token])

  const value: AuthContextType = { user, getUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;