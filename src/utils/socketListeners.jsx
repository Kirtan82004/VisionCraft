// src/utils/socketListeners.js
import store from "../store/store.js";
import { socket } from "./socket.js";

// Product
import {
  productAddedRealtime,
  productUpdatedRealtime,
  productDeletedRealtime,
} from "../store/productSlice.js";

// Orders (User)
import {
  orderPlacedRealtime,
  orderCancelledRealtime,
} from "../store/orderSlice.js";

// Orders (Admin)
import {
  addOrderRealtime,
  cancelOrderRealtime,
} from "../store/admin/adminOrederSlice.js";

// Cart
import {
  cartUpdatedRealtime,
} from "../store/cartSlice.js";

// Wishlist
import {
  wishlistUpdatedRealtime,
  wishlistClearedRealtime,
} from "../store/wishlistSlice.js";

// Reviews
import {
  reviewAddedRealtime,
  reviewUpdatedRealtime,
  reviewDeletedRealtime,
} from "../store/reviewSlice.js";

// Notifications
import { addNotification } from "../store/notificationSlice.js";

let listenersRegistered = false;

// ✅ Register all listeners (ONLY ONCE)
export const registerSocketListeners = () => {
  if (listenersRegistered) return;
  listenersRegistered = true;

  /* ================= PRODUCTS ================= */
  socket.off("productCreated");
  socket.on("productCreated", ({ product }) => {
    if (product) store.dispatch(productAddedRealtime(product));
  });

  socket.off("productUpdated");
  socket.on("productUpdated", ({ product }) => {
    if (product) store.dispatch(productUpdatedRealtime(product));
  });

  socket.off("productDeleted");
  socket.on("productDeleted", ({ productId }) => {
    if (productId) store.dispatch(productDeletedRealtime({ productId }));
  });

  /* ================= ORDERS ================= */

  socket.off("orderPlaced");
  socket.on("orderPlaced", ({ order }) => {
    if (!order) return;

    // user orders
    store.dispatch(orderPlacedRealtime(order));

    // admin orders
    store.dispatch(addOrderRealtime(order));
  });

  socket.off("orderCancelled");
  socket.on("orderCancelled", ({ orderId, status }) => {
    if (!orderId) return;

    store.dispatch(orderCancelledRealtime({ orderId, status }));
    store.dispatch(cancelOrderRealtime({ orderId, status }));
  });

  /* ================= CART ================= */
  socket.off("cartUpdated");
  socket.on("cartUpdated", (data) => {
    if (data?.items) {
      store.dispatch(cartUpdatedRealtime(data));
    }
  });

  /* ================= WISHLIST ================= */
  socket.off("wishlistUpdated");
  socket.on("wishlistUpdated", (data) => {
    if (data?.wishlist) {
      store.dispatch(wishlistUpdatedRealtime(data));
    }
  });

  socket.off("wishlistCleared");
  socket.on("wishlistCleared", () => {
    store.dispatch(wishlistClearedRealtime());
  });

  /* ================= REVIEWS ================= */
  socket.off("reviewAdded");
  socket.on("reviewAdded", ({ review }) => {
    if (review) store.dispatch(reviewAddedRealtime(review));
  });

  socket.off("reviewUpdated");
  socket.on("reviewUpdated", ({ review }) => {
    if (review) store.dispatch(reviewUpdatedRealtime(review));
  });

  socket.off("reviewDeleted");
  socket.on("reviewDeleted", ({ reviewId }) => {
    if (reviewId) store.dispatch(reviewDeletedRealtime({ reviewId }));
  });

  /* ================= NOTIFICATIONS ================= */
  socket.off("userRegistered");
  socket.on("userRegistered", (data) => {
    store.dispatch(
      addNotification({
        type: "New User",
        message: `User ${data.email} registered`,
        timestamp: Date.now(),
      })
    );
  });

  console.log("✅ Socket listeners registered");
};

// Notifications
socket.off("notification");
socket.on("notification", (data) => {
  store.dispatch(
    addNotification({
      type: data.type || "INFO",
      message: data.message,
      timestamp: data.createdAt || Date.now(),
    })
  );
});