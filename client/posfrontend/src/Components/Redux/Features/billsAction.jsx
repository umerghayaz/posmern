import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "http://127.0.0.1:8080/api/v1/bills/get-bills";

// create User
export const createBill = createAsyncThunk("createBill", async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8080/api/v1/bills/add-bills", data);
    console.log(response.data,'data');
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// read User
export const showBills = createAsyncThunk("showBills", async () => {
  try {
    const response = await axios.get(POST_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
