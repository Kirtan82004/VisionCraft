// src/utils/socketListeners.js
import store  from "../store/store.js"; // Import the store to dispatch actions
import { socket } from "./socket.js";

// import realtime reducers from slices
import { productAddedRealtime, productUpdatedRealtime, productDeletedRealtime } from "../store/productSlice.js";
import { orderPlacedRealtime, orderCancelledRealtime } from "../store/orderSlice.js";
import { addOrderRealtime, cancelOrderRealtime } from "../store/adminOrederManagmentSlice.js";
import { cartUpdatedRealtime, cartClearedRealtime } from "../store/cartSlice.js";
import { wishlistUpdatedRealtime, wishlistClearedRealtime } from "../store/wishlistSlice.js";
import { reviewAddedRealtime, reviewUpdatedRealtime, reviewDeletedRealtime } from "../store/reviewSlice.js";
import { addNotification } from "../store/notificationSlice.js";

// ✅ Register all listeners
export const registerSocketListeners = () => {
  // Products
  socket.on("productCreated", (data) => {
    store.dispatch(productAddedRealtime(data.product));
  });
  socket.on("productUpdated", (data) => {
    store.dispatch(productUpdatedRealtime(data.product));
  });
  socket.on("productDeleted", (data) => {
    store.dispatch(productDeletedRealtime(data));
  });

  // Orders (User)
  socket.on("orderPlaced", (data) => {
    store.dispatch(orderPlacedRealtime(data.order));
  });
  socket.on("orderCancelled", (data) => {
    store.dispatch(orderCancelledRealtime(data));
  });

  // Orders (Admin)
  socket.on("orderPlaced", (data) => {
    store.dispatch(addOrderRealtime(data.order));
  });
  socket.on("orderCancelled", (data) => {
    store.dispatch(cancelOrderRealtime(data));
  });

  // Cart
  socket.on("cartUpdated", (data) => {
    store.dispatch(cartUpdatedRealtime(data));
  });
  socket.on("cartCleared", () => {
    store.dispatch(cartClearedRealtime());
  });

  // Wishlist
  socket.on("wishlistUpdated", (data) => {
    console.log("Wishlist updated realtime data:", data);
    store.dispatch(wishlistUpdatedRealtime(data));
  });
  socket.on("wishlistCleared", () => {
    store.dispatch(wishlistClearedRealtime());
  });

  // Reviews
  socket.on("reviewAdded", (data) => {
    store.dispatch(reviewAddedRealtime(data.review));
  });
  socket.on("reviewUpdated", (data) => {
    store.dispatch(reviewUpdatedRealtime(data.review));
  });
  socket.on("reviewDeleted", (data) => {
    store.dispatch(reviewDeletedRealtime(data));
  });

  // Notifications (example: new user registered)
  socket.on("userRegistered", (data) => {
    store.dispatch(addNotification({
      type: "New User",
      message: `User ${data.fullName} registered with email ${data.email}`,
      timestamp: data.createdAt,
    }));
  });
};