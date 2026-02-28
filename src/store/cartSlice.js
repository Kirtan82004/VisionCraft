import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ SET CART FROM BACKEND RESPONSE
    setCart: (state, action) => {
      /*
        Expected backend response structure:
        {
          _id: "...",
          products: [
            {
              product: {...},
              quantity: 2
            }
          ]
        }
      */
      state.cartItems = action.payload

      state.totalItems = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    // ✅ REALTIME SOCKET UPDATE (optional)
    cartUpdatedRealtime: (state, action) => {
      const products = action.payload?.products || [];

      state.cartItems = products.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

      state.totalItems = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    // ✅ CLEAR CART (logout / order placed)
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
    },
  },
});

export const {
  setCart,
  cartUpdatedRealtime,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
