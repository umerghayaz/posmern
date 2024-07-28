import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "http://127.0.0.1:8080/api/v1/item/get-item";

// create User
export const createItem = createAsyncThunk("createItem", async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8080/api/v1/item/add-item", data);
    console.log(response.data,'data');
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// read User
export const showItem = createAsyncThunk("showItem", async () => {
  try {
    const response = await axios.get(POST_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const getItemid = createAsyncThunk("getitemid", async (id) => {
    try {
      const response = await axios.put(
        `127.0.0.1:8080/api/v1/item/reduxcrud/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  });
// update User
export const updateItem = createAsyncThunk("updateitem", async (payload) => {
  try {
    const { id, values } = payload;

    console.log(payload,'before');
    const response = await axios.put(
      `http://127.0.0.1:8080/api/v1/item/edit-item/${id}`,
      values
    );
    console.log(values,'before',id);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// delete User
export const deleteItem = createAsyncThunk("deleteUser", async (id) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8080/api/v1/item/delete-item/`,{ "itemId":id}
    );
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});