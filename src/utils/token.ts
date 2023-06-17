import api from "./api";

export const storeData = (object: { [key: string]: any }) => {
  Object.entries(object).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  })
}

export const getLocalData = <T>(key: string) => {
  const data = localStorage.getItem(key) as string;
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
}

export const refreshAccessToken = () => {
  const TIME = 10 * 60 * 1000; // 10mins

  setInterval(() => {
    const timeout = getLocalData("timeout") as string;
    const timeCheck = Date.now() - parseInt(timeout);

    if (timeCheck > 0 && timeCheck < TIME) {
      api.get("/refresh").then((res: any) => {
        if (res.status) {
          storeData({token: res.data.token, timeout: res.data.timeout});
        }
      })
    } else {
      localStorage.clear();
      location.href = "/login"
    }

  }, TIME - 1);
}