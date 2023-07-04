import { createSlice } from "@reduxjs/toolkit";

const newbookingSlice = createSlice({
    name: 'newbooking',
    initialState: {
        menuId: null,
        menuName: null,
        staffId: null,
        staffName: null,
        duration: null,
        pickedDay: null,
        startTime: null,
        endingTime: null,
    },
    reducers: {
        addMenuState: (state, action) => {
            state.menuId = action.payload._id;
            state.menuName = action.payload.menuname;
            state.duration = action.payload.duration;
            state.price = action.payload.price;
        },
        addStaffState: (state, action) => {
            state.staffId = action.payload._id;
            state.staffName = action.payload.staffName
        },
        setDate: (state, action) => {
            state.pickedDay = action.payload;
        },
        setTime: (state, action) => {
            state.startTime = action.payload.startTime;
            state.endingTime = action.payload.endingTime;
        }
    }
});

export const { addMenuState, addStaffState, setDate, setTime } = newbookingSlice.actions;
export default newbookingSlice.reducer;