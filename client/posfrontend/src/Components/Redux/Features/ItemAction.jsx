import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
export const AddItem = createAsyncThunk("AddItem", async (data) => {
    try {
      console.log(data);
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  });