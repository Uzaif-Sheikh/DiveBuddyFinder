import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    id: string,
    name: string,
    email: string,
    role: string,
    isVerifed: boolean,
};

const initialState: userState = {
    id: '',
    name: '',
    email: '',
    role: '',
    isVerifed: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<userState>) => {
            return action.payload;
        }
    }
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;