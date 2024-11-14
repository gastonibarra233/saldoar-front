import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://api.saldo.com.ar/bridge/login", null, {
        params: { email, password },
      });

      const mockToken = "saldoar_login_token";
      if (response.status === 200) {
        const user = { token: mockToken, email, name: response.data.name }
        localStorage.setItem("token", mockToken);
        localStorage.setItem('user', JSON.stringify(user))
        return { user, token: mockToken};
      }
    } catch (error) {
      return rejectWithValue("Credenciales incorrectas");
    }
  }
);

const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  user: initialUser,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
