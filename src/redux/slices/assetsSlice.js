import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://api.saldo.com.ar/v3/systems");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Error al obtener los assets");
    }
  }
);

const initialState = {
  assets: [],
  loading: false,
  error: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default assetsSlice.reducer;
