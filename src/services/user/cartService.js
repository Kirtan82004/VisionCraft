import API from "../../utils/axiosInstance";

/* =====================
   GET CART
===================== */
const getCart = async () => {
  const res = await API.get("users/getCart", {
    withCredentials: true,
  });
  return res.data;
};

/* =====================
   ADD TO CART
===================== */
const addToCart = async ({ productId, quantity = 1 }) => {
  const res = await API.post(
    "users/addToCart",
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data;
};

/* =====================
   REMOVE FROM CART
===================== */
const removeFromCart = async (productId) => {
  const res = await API.delete("users/removeFromCart", {
    data: { productId },
    withCredentials: true,
  });
  return res.data;
};

/* =====================
   CLEAR CART
===================== */
const clearCart = async () => {
  const res = await API.delete("users/clearCart", {
    withCredentials: true,
  });
  return res.data;
};

export {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
