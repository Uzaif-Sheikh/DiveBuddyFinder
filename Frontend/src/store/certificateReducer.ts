import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Certificate, getCertificatesApi } from "../api/certificateApi";

interface CertificateState {
  certificates: Certificate[];
}

const initialState: CertificateState = {
  certificates: [],
};

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCertificateAsync.fulfilled, (state, action) => {
			if(action.payload) {
				state.certificates = action.payload;
			}
		});
	}
});

export const getCertificateAsync = createAsyncThunk(
  "certificate/getCertificatesAsync",
  async () => {
    try {
      const res = await getCertificatesApi();
      if (res.ok) {
        return res.data;
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
      return [];
    }
  },
);

export default certificateSlice.reducer;
