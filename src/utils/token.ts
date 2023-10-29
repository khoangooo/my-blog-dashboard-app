import api from "./api";

export const storeData = (object: { [key: string]: any }) => {
  Object.entries(object).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  })
}

export const retrieveData = <T>(key: string) => {
  const data = localStorage.getItem(key) as string;
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
}

export const refreshAccessToken = () => {
  const time = (9*60 + 50) * 1000;
  setInterval(() => {
    const refreshToken = retrieveData<string>("refreshToken");
    if (refreshToken) {
      api
        .post("/refresh", { body: JSON.stringify({ refreshToken }) })
        .then((res: any) => {
          if (res.status) {
            console.log("success")
            storeData({ token: res.data.token, timeout: res.data.timeout });
          } else {
            localStorage.clear();
            location.href = "/login"
          }
        })
        .catch((e) => {
          localStorage.clear();
          location.href = "/login"
        })
    }
  }, time);
}