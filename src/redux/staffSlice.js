import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";


export const getStaffProfile = createAsyncThunk("user/getStaffProfile", async() => {
  const Token = useSelector(state => state.staffAuth.data);
  try {
    const res = axios.defaults.headers.common['token'] = Token.accessToken;
    //accessTokenの有効期限が切れていた場合refreshする
    // if() {
    //   const token = Token.refreshToken;
    //   const refreshToken = createAsyncThunk("auth/refresh", async({ refreshToken: token }) => {
    //     const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/refresh", { refreshToken: token });
    //     const refreshRes = axios.defaults.headers.common['token'] = res.data.token;
    //     return refreshRes.data; // accessToken(token)
    //   });
    // }
    return res.data;
  } catch(error) {
    console.log(error);
  }
})


const staffSlice = createSlice({
  name: 'staff',
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
    builder.addCase(getStaffProfile.pending, (state) => {
        state.loading = true;
    }).addCase(getStaffProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    }).addCase(getStaffProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  }
});

export const { staffLogout } = staffSlice.actions;
export default staffSlice.reducer;