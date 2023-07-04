import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMenu = createAsyncThunk("menu/getMenu", async() => {
    try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/menu/getMenu");
        return res.data.menu;
    } catch(error) {
        console.log(error);
    }
});

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        data: null,
        error: null,
        loading: false
    },
    reducers: {
        // addNewMenu: (state, action) => {
        //     state.data.push(action.payload);
        // },
        // updateMenuInfo: (state, action) => {
        //     state.data.map((menu) => {
        //         if(menu.id === action.payload.id) {
        //             menu = action.payload;
        //             // and more...
        //         }
        //     });
        // },
        deleteMenuInfo: (state, action) => {
            state.data = state.data.filter((menu) => menu._id != action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMenu.pending, (state) => {
            state.loading = true;
        }).addCase(getMenu.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(getMenu.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { deleteMenuInfo } = menuSlice.actions;
// export const { addNewMenu, updateMenu, deleteMenu } = menuSlice.actions;
export default menuSlice.reducer;