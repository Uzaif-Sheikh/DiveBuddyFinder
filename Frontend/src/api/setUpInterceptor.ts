import { AxiosInstance } from "axios";
import { AppStore } from "../store/store";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (reason?: any) => void;
}[] = [];
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setUpInterceptor = (api: AxiosInstance, store: AppStore) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().users.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("Interceptor error:", error);
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        store.dispatch({ type: "user/removeUserState" });
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const res = await api.post("/Auth/RefreshToken");
        console.log("Token refreshed:", res);
        const newToken = res.data.accessToken as string;

        store.dispatch({ type: "users/setAccessToken", payload: newToken });

        originalRequest.headers["Authorization"] = "Bearer " + newToken;
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        processQueue(err, null);
        store.dispatch({ type: "user/removeUserState" });

        // logout logic here, e.g. clear tokens, redirect to login, etc.
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    },
  );
};
