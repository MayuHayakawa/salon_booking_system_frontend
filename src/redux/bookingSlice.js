import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserBooking = createAsyncThunk("booking/getBooking", async(_, thunkAPI) => {
    const Token = await thunkAPI.getState().userAuth.data;
    try {
        axios.defaults.headers.common['token'] = `${Token.accessToken}`;
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/booking/getBooking");
        return res.data.booking;
    } catch(error) {
        console.log(error);
    }
});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        data: null,
        error: null,
        loading: false
    },
    reducers: {
        deleteBookingInfo: (state, action) => {
            state.data = state.data.filter((booking) => booking._id != action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserBooking.pending, (state) => {
            state.loading = true;
        }).addCase(getUserBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(getUserBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { deleteBookingInfo } = bookingSlice.actions;
export default bookingSlice.reducer;