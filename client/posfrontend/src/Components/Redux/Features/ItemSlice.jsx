import { createSlice } from "@reduxjs/toolkit";
import { AddItem } from "./ItemAction";

// Slice banao
export const ItemCart = createSlice({
  name: "ItemCart",
  initialState: {
    cartitems: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartitems.push(action.payload);
      })
      .addCase(AddItem.rejected, (state, action) => {
        state.loading = false;
        state.cartitems = action.payload;
      })
     
  },
});

export const { searchUser } = ItemCart.actions;
export default ItemCart.reducer;
