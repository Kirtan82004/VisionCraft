// src/slices/reviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    fetchReviewsStart: (state) => {
      state.loading = true;
    },
    fetchReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    fetchReviewsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((review) => review._id !== action.payload);
    },
    editReview:(state,action)=>{
      state.reviews=state.reviews.map((review)=>review._id===action.payload.id?{
        ...review,
        ...action.payload
        }:review);
    },
    getReviews:(state,action)=>{
      state.reviews=action.payload;
    }

  },
});

export const { fetchReviewsStart, fetchReviewsSuccess, fetchReviewsFailure, addReview, editReview, removeReview} = reviewSlice.actions;
export default reviewSlice.reducer;
