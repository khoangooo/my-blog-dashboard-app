import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "@/context";
import api from "@/utils/api";

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken")

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

  const value: any = { user, getUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;