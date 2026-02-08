import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDiverApi } from "../api/diverApi";

export type DiverState = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  totalDives: number;
  certificates: string[];
  img: null | string;
  bio: string;
  location: {
    suburb: string;
    state: string;
    postcode: string;
    countryCode: string;
  };
};

const initialState: DiverState = {
  id: "",
  firstName: "",
  lastName: "",
  age: 0,
  totalDives: 0,
  certificates: [],
  img: null,
  bio: "",
  location: {
    suburb: "",
    state: "",
    postcode: "",
    countryCode: "",
  },
};

const diverSlice = createSlice({
  name: "diver",
  initialState,
  reducers: {
    setDiverState: (state, action: PayloadAction<DiverState>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDiverAsync.fulfilled, (state, action) => {
      if(action.payload) {
        state.id = action.payload.userId;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.age = action.payload.age;
        state.totalDives = action.payload.numberOfDives;
        state.bio = action.payload.bio;
        state.img = action.payload.image;
        state.certificates = action.payload.certificates.map((cert: any) => cert.name || cert);
        state.location = action.payload.location;
      }
    });
  }
});

export const createDiverAsync = createAsyncThunk(
  "diver/createDiverAsync",
  async (diverData: DiverState) => {
    try {
			const response = await createDiverApi(diverData);
			if (response.ok) {
				return response.data;
			}
			throw new Error(response.error.message || "Failed to create diver");
    } catch (error) {
      console.error("Failed to create diver:", error);
      return null;
    }
  },
);

export default diverSlice.reducer;
export const { setDiverState } = diverSlice.actions;
