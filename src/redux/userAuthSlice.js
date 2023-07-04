import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk("auth/userRegister", async({ firstName, lastName, email, phoneNumber, password }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/userRegister", { firstName, lastName, email, phoneNumber, password });
    return res.data; // accessToken & refreshToken
  } catch(error) {
    console.log(error);
  }
});

export const userLogin = createAsyncThunk("auth/userLogin", async({ email, password }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/userLogin", { email, password });
    console.log(res.data);
    return res.data; // accessToken & refreshToken
  } catch(error) {
    console.log(error);
  }
});


const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    data: null,
    error: null,
    loading: false
  },
  reducers: {
    userAuthDelete: (state) => {
        state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
        state.loading = true;
    }).addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    }).addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    }).addCase(userLogin.pending, (state) => {
        state.loading = true;
    }).addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    }).addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  }
});

export const { userAuthDelete } = userAuthSlice.actions;
export default userAuthSlice.reducer;
