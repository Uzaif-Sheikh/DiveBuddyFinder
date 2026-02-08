import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginApi, logoutApi, registerApi } from "../api/authApi";
import { loadUser, saveUser, clearUser } from "../utils/storage";

export interface userState {
  id: string;
  email: string;
  role: string;
  isVerifed: boolean;
}

export type authState = {
  user: userState | null;
  accessToken: string | null;
};

type AuthSuccess = {
  id: string;
  accessToken: string;
  email: string;
  role: string;
  isVerified: boolean;
};

const initialState: authState = {
  user: loadUser(),
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
    setUserState: (state, action: PayloadAction<authState>) => {
      return action.payload;
    },
    removeUserState: (state) => {
      state.user = null;
      state.accessToken = null;
      clearUser();
      window.location.href = "/";
      return state;
    }
  },
  extraReducers: (builder) => {
    (builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      console.log("Login fulfilled with payload:", action.payload);
      if (action.payload) {
        state.user = {
					id: action.payload.id,
					email: action.payload.email,
					role: action.payload.role,
					isVerifed: action.payload.isVerified,
				};
				state.accessToken = action.payload.accessToken;
				saveUser(state.user);
      }
      return state;
    }),
		builder.addCase(resigterUserAsync.rejected, (state, action) => {
			return state;
		}),
		builder.addCase(resigterUserAsync.fulfilled, (state, action) => {
			if (action.payload) {
				state.user = {
					id: action.payload.id,
					email: action.payload.email,
					role: action.payload.role,	
					isVerifed: action.payload.isVerified,
				};
				state.accessToken = action.payload.accessToken;
				saveUser(state.user);
			}
			return state;
		}));
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.user = null;
			state.accessToken = null;
			clearUser();
      window.location.href = "/";
			return state;
		});
  },
});

export const loginUserAsync = createAsyncThunk<
AuthSuccess,
{ email: string; password: string },
{ rejectValue: { error: string } }
>(
  "user/loginUserAsync",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await LoginApi(payload);

			console.log(res);

      if (res.ok) {
        return {
          id: res.data.userId,
          accessToken: res.data.accessToken,
          email: payload.email,
          role: "",
          isVerified: res.data.isVerified,
        };
      }

      return rejectWithValue({ error: res.error instanceof Error ? res.error.message : String(res.error) });
    } catch (error) {
      console.error("Login failed:", error);
      return rejectWithValue({ error: String(error) });
    }
  },
);

export const resigterUserAsync = createAsyncThunk<
	AuthSuccess,
	{ email: string; password: string },
	{ rejectValue: { error: string } }
>(
  "user/registerUserAsync",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await registerApi(payload);

      if (res.ok) {
        return {
          id: res.data.userId,
          accessToken: res.data.accessToken,
          email: payload.email,
          role: "",
          isVerified: res.data.isVerified,
        };
      }

      return rejectWithValue({ error: res.error instanceof Error ? res.error.message : String(res.error) });
    } catch (error) {
      return rejectWithValue({ error: String(error) });
    }
  },
);

export const logoutUser = createAsyncThunk<
void,
void,
{ rejectValue: { error: string } }
>(
	"user/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			const res = await logoutApi();

      console.log(res);

			if (res.ok) {
				return;
			}

			return rejectWithValue({ error: res.error instanceof Error ? res.error.message : String(res.error) });
		}
		catch (error) {
			return rejectWithValue({ error: String(error) });
		}
	}
);

export const { setUserState, setAccessToken } = userSlice.actions;
export default userSlice.reducer;