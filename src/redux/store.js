import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import userAuthSlice from "./userAuthSlice";
import userReducer from "./UserSlice";
import bookingReducer from "./bookingSlice";
import allStaffReducer from "./allStaffSlice";
import staffAuthSlice from "./staffAuthSlice";
import staffReducer from "./staffSlice";
import menuReducer from "./menuSlice";
import newbookingReducer from "./newbookingSlice";

const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        user: userReducer,
        booking: bookingReducer,
        allStaff: allStaffReducer,
        staffAuth: staffAuthSlice,
        staff: staffReducer,
        menu: menuReducer,
        newbooking: newbookingReducer
    },
    preloadedState: load({namespace: 'online_booking_store'}),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({namespace: 'online_booking_store'})),
});

export default store;