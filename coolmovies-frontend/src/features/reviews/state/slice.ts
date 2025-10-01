import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Review = {
  id: string;
  title: string;
  body?: string | null;
  rating: number;
  movieId: string;
  userReviewerId: string;
};

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    fetchReviews: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    fetchReviewsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addReview: (
      state,
      _action: PayloadAction<{
        title: string;
        body?: string | null;
        rating: number;
        movieId: string;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    addReviewSuccess: (state, action: PayloadAction<Review>) => {
      state.loading = false;
      state.reviews = [action.payload, ...state.reviews];
    },
    addReviewError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = reviewsSlice;
export type ReviewsSliceAction = typeof actions;
export default reviewsSlice.reducer;



