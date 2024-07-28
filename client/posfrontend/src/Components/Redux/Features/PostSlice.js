import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
// for getting post
export const getPost = createAsyncThunk("post/getPost", 
async () => {
    const response = await axios.get(`https://639b1ae531877e43d682709d.mockapi.io/reduxcrud`);
    // console.log(response.data,'data')
    return response.data;
    // return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    //   res.json()
    // );
  }
  );
// for grtting individual post
export const getPostByid = createAsyncThunk("post/getPostByid", 
async ({ id }) => {
    const response = await axios.get(`https://639b1ae531877e43d682709d.mockapi.io/reduxcrud/${id}`);
    console.log(response.data,'data')
    return response.data;
    
  }
  );
// for deleting individual post
export const getDeletePostByid = createAsyncThunk("delete/getDeletePostByid", 
async ({ id }) => {
    const response = await axios.delete(`https://639b1ae531877e43d682709d.mockapi.io/reduxcrud/${id}`);
    console.log(response.data,'data')
    return response.data;
    
  }
  );
  const PostSlice = createSlice({
    name: "post",
    initialState: {
      post: [],
      loading: false,
      error: null,
      body: "",
      edit: false,
    },
    
    extraReducers: (builder) => {
        builder
          .addCase(getPost.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.post = [action.payload];
          })
          .addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
          builder
          .addCase(getPostByid.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getPostByid.fulfilled, (state, action) => {
            state.loading = false;
            state.post = [action.payload];
          })
          .addCase(getPostByid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
          builder
          .addCase(getDeletePostByid.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getDeletePostByid.fulfilled, (state, action) => {
            state.loading = false;
            state.post = [action.payload];
            // state.post = state.post.filter((user) => user.id !== action.payload.id);

          })
          .addCase(getDeletePostByid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
    
    });
    
    export default PostSlice.reducer;