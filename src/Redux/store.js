import { configureStore } from "@reduxjs/toolkit";
import { brandsReducer } from "./brandsSlice.js";
import { categoriesReducer } from "./categorySlice.js";


export let store = configureStore({
  reducer:{
    brand : brandsReducer,
    category : categoriesReducer
  }
})