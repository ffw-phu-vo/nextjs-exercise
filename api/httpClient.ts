import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getStorage, removeStorage, setStorage } from "../helper/storage";

let token = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = `${localStorage.getItem("my-token")}`;
}

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`, {
      headers: { refreshtoken: `${getStorage("my-refresh-token")}` },
    })
    .then((tokenRefreshResponse) => {
      setStorage('my-token', tokenRefreshResponse.data.token)
      setStorage('my-refresh-token', tokenRefreshResponse.data.refresh_token)

      failedRequest.response.config.headers["Authorization"] = tokenRefreshResponse.data.token;
      return Promise.resolve();
    })
    .catch((error) => {
      removeStorage('my-token')
      removeStorage('my-refresh-token')
    });

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { Authorization: token },
});

createAuthRefreshInterceptor(httpClient, refreshAuthLogic);

export default httpClient;
