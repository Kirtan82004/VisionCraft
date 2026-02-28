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
    // ------------------ Async Actions ------------------
    fetchReviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    fetchReviewsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ------------------ Local Updates ------------------
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    editReview: (state, action) => {
      state.reviews = state.reviews.map((review) =>
        review._id === action.payload._id ? { ...review, ...action.payload } : review
      );
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((review) => review._id !== action.payload);
    },

    // ------------------ Socket Realtime ------------------
    reviewAddedRealtime: (state, action) => {
      // Add review if it doesn't exist already
      const exists = state.reviews.some(r => r._id === action.payload._id);
      if (!exists) state.reviews.push(action.payload);
    },
    reviewUpdatedRealtime: (state, action) => {
      state.reviews = state.reviews.map((review) =>
        review._id === action.payload._id ? action.payload : review
      );
    },
    reviewDeletedRealtime: (state, action) => {
      state.reviews = state.reviews.filter((review) => review._id !== action.payload.reviewId);
    },
  },
});

export const {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReview,
  editReview,
  removeReview,
  reviewAddedRealtime,
  reviewUpdatedRealtime,
  reviewDeletedRealtime,
} = reviewSlice.actions;

export default reviewSlice.reducer;
