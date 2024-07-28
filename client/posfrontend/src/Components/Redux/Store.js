import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./Features/PostSlice";
import userDetail  from "./Features/userDetailSlice";
import ProductSlice from "./Features/ProductSlice";
import ItemSlice from "./Features/ItemSlice";
import BillsSlice from "./Features/BillsSlice";

export const store = configureStore({
    reducer: {
      app: userDetail,
      product:ProductSlice,
      Item:ItemSlice,
      Bills:BillsSlice
    },
  });
  
  export default store;