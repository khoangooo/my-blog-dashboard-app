import { PropsWithChildren, useState } from "react";
import { AuthContext } from "@/context";
import api from "@/utils/api";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const login = ({ username, password }: { username: string, password: string }, callback: VoidFunction) => {
    api
      .post("/me", {
        body: JSON.stringify({ username, password })
      })
      .then((res: any) => {
        if (res.status) {
          localStorage.setItem("user", JSON.stringify(res.data))
          setUser(res.data)
          navigate("/")
          callback()
        }
      })
  };

  const logout = (callback: VoidFunction) => {
    localStorage.removeItem("user");
    setUser(null)
    callback()
  };

  const value: any = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;