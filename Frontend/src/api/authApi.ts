
const apiKey = import.meta.env.VITE_BACKEND_API;

export interface authPayload {
    email: string;
    password: string;
}

type ResultResponse<T> = | {ok: true; status: number; data: T} 
| {ok: false; status: number; error: Error};

type AuthResponse = {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

type RegisterResponse = ResultResponse<AuthResponse>;

type LoginResponse = ResultResponse<AuthResponse & { isVerified: boolean}>




export const LoginApi = async (payload: authPayload): Promise<LoginResponse> => {
    try {
        const result = await fetch(`${apiKey}api/Auth/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    
        const res = await result.json();
    
        return {
            ok: result.ok,
            status: result.status,
            ...res
        };
    } catch (error) {
        throw new Error("call failed for login api");
        
    }
};

export const registerApi = async (payload: authPayload): Promise<RegisterResponse> => {
    try {
        const result = await fetch(`${apiKey}api/Auth/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    
        const res = await result.json();
    
        return {
            ok: result.ok,
            status: result.status,
            ...res
        };
    } catch (error) {
        throw new Error("call failed for register api");
        
    }
};

