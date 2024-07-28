import { createSlice } from "@reduxjs/toolkit";
import { createBill, showBills } from "./billsAction";

// Slice banao
export const BillsDetail = createSlice({
  name: "BillsDetail",
  initialState: {
    bills: [],
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
      .addCase(createBill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills.push(action.payload);
      })
      .addCase(createBill.rejected, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(showBills.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(showBills.rejected, (state, action) => {
        state.loading = true;
        state.bills = action.payload;
      })
     
  },
});

export const { searchUser } = BillsDetail.actions;
export default BillsDetail.reducer;
