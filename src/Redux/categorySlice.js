import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { categories: [], isLoading: false, error: null }

export let getCategories = createAsyncThunk('categoriesSlice/getCategories',
  async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .catch((err) => err)
    return data.data
  }
)

let categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
  }
})

export let categoriesReducer = categoriesSlice.reducer