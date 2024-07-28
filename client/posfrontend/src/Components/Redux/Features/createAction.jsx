import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://639b1ae531877e43d682709d.mockapi.io/reduxcrud";

// create User
export const createUser = createAsyncThunk("createUser", async (data) => {
  try {
    const response = await axios.post(POST_URL, data);
    console.log(response.data,'data');
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// read User
export const showUser = createAsyncThunk("showUser", async () => {
  try {
    const response = await axios.get(POST_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const getUserid = createAsyncThunk("getuserid", async (id) => {
    try {
      const response = await axios.put(
        `https://639b1ae531877e43d682709d.mockapi.io/reduxcrud/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  });
// update User
export const updateUser = createAsyncThunk("updateUser", async (payload) => {
  try {
    const { id, values } = payload;

    console.log(payload,'before');
    const response = await axios.put(
      `https://639b1ae531877e43d682709d.mockapi.io/reduxcrud/${id}`,
      values
    );
    console.log(values,'before',id);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// delete User
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `https://639b1ae531877e43d682709d.mockapi.io/reduxcrud/${id}`
    );
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});