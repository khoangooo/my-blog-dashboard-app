import { useEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user") as string); 
    if (item) {
      setUser(item)
    }
  }, [])

  return user;
}

export default useAuth;
