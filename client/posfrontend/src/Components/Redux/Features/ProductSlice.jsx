import { createSlice } from "@reduxjs/toolkit";
import { createItem, deleteItem, showItem, updateItem } from "./ProductAction";

// Slice banao
export const ItemDetail = createSlice({
  name: "ItemDetail",
  initialState: {
    item: [],
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
      .addCase(createItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(showItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(showItem.rejected, (state, action) => {
        state.loading = true;
        state.item = action.payload;
      })
      // .addCase(getItemid.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(getItemid.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.item = action.payload;
      // })
      // .addCase(getItemid.rejected, (state, action) => {
      //   state.loading = true;
      //   state.item = action.payload;
      // })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item = state.item.map((element) =>
          element.id === action.payload.id ? action.payload : element
        );
        // console.log(action.payload,'dataarray')
        // state.users.push(action.payload);

      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.item = state.item.filter((element) => element.id !== id);
        }
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = true;
        state.Item = action.payload;
      });
  },
});

export const { searchUser } = ItemDetail.actions;
export default ItemDetail.reducer;
