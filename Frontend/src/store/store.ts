import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer";
import certificateReducer from "./certificateReducer";
import diverReducer from "./diverReducer";
import { setUpInterceptor } from "../api/setUpInterceptor";
import api from "../api/axios";

export const store = configureStore({
    reducer: {
        users: userReducer,
        certificate: certificateReducer,
        diver: diverReducer
    }
});

setUpInterceptor(api, store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;