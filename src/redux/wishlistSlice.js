
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.some(
        (product) => product.id === action.payload.id
      );

      if (exists) {
        return state.filter(
          (product) => product.id !== action.payload.id
        );
      }

      state.push(action.payload);
    },
    clearWishlist: () => [],
  },
});

export const { toggleWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
