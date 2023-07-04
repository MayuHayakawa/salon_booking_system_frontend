import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// test@test.com

export const getUserProfile = createAsyncThunk("user/getUserProfile", async(_, thunkAPI) => {
  const Token = await thunkAPI.getState().userAuth.data;
  try {
    axios.defaults.headers.common['token'] = `${Token.accessToken}`;
    const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/user/getUserProfile");
    //accessTokenの有効期限が切れていた場合refreshする
    // if() {
    //   const token = Token.refreshToken;
    //   const refreshToken = createAsyncThunk("auth/refresh", async({ refreshToken: token }) => {
    //     const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/refresh", { refreshToken: token });
    //     const refreshRes = axios.defaults.headers.common['token'] = res.data.token;
    //     return refreshRes.data; // accessToken(token)
    //   });
    // }
    return res.data.user;
  } catch(error) {
    console.log(error);
  }
})


const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    error: null,
    loading: false
  },
  reducers: {
    userUpdateInfo: (state, action) => {
      state.data = action.payload;
    },
    userLogout: (state) => {
        state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
        state.loading = true;
    }).addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    }).addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  }
});

export const { userUpdateInfo, userLogout } = userSlice.actions;
export default userSlice.reducer;
