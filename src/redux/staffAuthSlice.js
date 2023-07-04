import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// export const staffRegister = createAsyncThunk("auth/staffRegister", async({ name, email, password }) => {
//   try {
//     const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/staffRegister", { name, email, password });
//     return res.data; // accessToken & refreshToken
//   } catch(error) {
//     console.log(error);
//   }
// });

export const staffLogin = createAsyncThunk("auth/staffLogin", async({ email, password }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/staffLogin", { email, password });
    return res.data; // accessToken & refreshToken
  } catch(error) {
    console.log(error);
  }
});


const staffAuthSlice = createSlice({
    name: 'staffAuth',
    initialState: {
      data: null,
      error: null,
      loading: false
    },
    reducers: {
      staffLogout: (state) => {
          state.data = null;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(staffLogin.pending, (state) => {
          state.loading = true;
      }).addCase(staffLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      }).addCase(staffLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      // .addCase(staffRegister.pending, (state) => {
      //   state.loading = true;
      // }).addCase(staffRegister.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.data = action.payload;
      // }).addCase(staffRegister.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.error.message;
      // });
    }
  });
  
  export const { staffLogout } = staffAuthSlice.actions;
  export default staffAuthSlice.reducer;