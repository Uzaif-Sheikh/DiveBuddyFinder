import api from "./axios";

const apiKey = import.meta.env.VITE_BACKEND_API;

export interface authPayload {
  email: string;
  password: string;
}

type ResultResponse<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: Error | string };

type AuthResponse = {
  userId: string;
  accessToken: string;
  isVerified: boolean;
};

type RegisterResponse = ResultResponse<AuthResponse>;

type LoginResponse = ResultResponse<AuthResponse>;

export const LoginApi = async (
  payload: authPayload,
): Promise<LoginResponse> => {
  try {
    const result = await api.post("/Auth/Login", JSON.stringify(payload));

    const res = result.data;

    return {
      ok: true,
      status: result.status,
      data: {
        userId: res.userId,
        accessToken: res.accessToken,
        isVerified: res.isVerified,
      },
    };
  } catch (err: any) {
    console.log("AXIOS ERROR OBJECT:", err);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);
    console.log("HEADERS:", err.response?.headers);
    return {
      ok: false,
      status: err.response?.status ?? 500,
      error: err.response?.data?.error ?? "Login failed",
    };
  }
};

export const registerApi = async (
  payload: authPayload,
): Promise<RegisterResponse> => {
  try {
    const result = await fetch(`${apiKey}api/Auth/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(result);

    if (!result.ok) {
      const errorData = await result.json();
      return {
        ok: result.ok,
        status: result.status,
        error: errorData.error || "Registration failed",
      };
    }

    const res = await result.json();

    return {
      ok: result.ok,
      status: result.status,
      data: {
        userId: res.userId,
        accessToken: res.accessToken,
        isVerified: false,
      },
    };
  } catch (error) {
    throw new Error("call failed for register api");
  }
};

export const logoutApi = async () : Promise<ResultResponse<null>> => {
	try {
    const result = await api.post("/Auth/Logout");

    return {
      ok: true,
      status: result.status,
      data: null
    };
  } catch (err: any) {
    return {
      ok: false,
      status: err.response?.status ?? 500,
      error: err.response?.data?.error ?? "Logout failed",
    };
  }
};

export const getVerificationCodeApi = async (
  email: string,
  accessToken: string,
): Promise<ResultResponse<null>> => {
  try {
    const result = await fetch(`${apiKey}api/Auth/GetVerificationCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!result.ok) {
      const errorData = await result.json();
      return {
        ok: result.ok,
        status: result.status,
        error: errorData.error || "Failed to get verification code",
      };
    }

    return {
      ok: true,
      status: result.status,
      data: null,
    };
  } catch (error) {
    throw new Error("call failed for get verification code api");
  }
};
