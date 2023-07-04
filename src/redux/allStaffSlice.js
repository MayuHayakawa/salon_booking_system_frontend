import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllStaff = createAsyncThunk("staff/getAllStaff", async() => {
  try {
    const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/staff/getAllStaff");
    return res.data.allStaff;
  } catch(error) {
    console.log(error);
  }
});

const allStaffSlice = createSlice({
  name: 'allStaff',
  initialState: {
    data: null,
    error: null,
    loading: false
  },
  reducers: {
    // addNewStaff: (state, action) => {
    //   state.data.push(action.payload);
    // },
    // updateStaff: (state, action) => {
    //   state.data.map((staff) => {
    //     if(staff.id === action.payload.id) {
    //       staff = action.payload;
    //     }
    //   });
    // },
    deleteStaffInfo: (state, action) => {
      state.data = state.data.filter((staff) => staff._id != action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStaff.pending, (state) => {
      state.loading = true;
    }).addCase(getAllStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    }).addCase(getAllStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { deleteStaffInfo } = allStaffSlice.actions;
// export const { addNewStaff, updateStaff, deleteStaff } = allStaffSlice.actions;
export default allStaffSlice.reducer;