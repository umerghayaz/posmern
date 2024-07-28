import { createSlice } from "@reduxjs/toolkit";
import { createUser, showUser, updateUser, deleteUser, getUserid } from "./createAction";

// Slice banao
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
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
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      })
      .addCase(getUserid.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserid.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserid.rejected, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((element) =>
          element.id === action.payload.id ? action.payload : element
        );
        // console.log(action.payload,'dataarray')
        // state.users.push(action.payload);

      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((element) => element.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      });
  },
});

export const { searchUser } = userDetail.actions;
export default userDetail.reducer;
