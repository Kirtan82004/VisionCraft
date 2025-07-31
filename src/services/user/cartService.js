import API from "../../utils/axiosInstance";

const getCart = async () => {
    try {
        const res = await API.get('users/getCart');
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const addToCart = async (productId) => {
    try {
        const res = await API.post('users/addToCart', productId);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const removeFromCart = async (productId) => {
    try {
        const res = await API.delete('users/removeFromCart', { data: { productId } });
        return res.data;
    } catch (error) {
        return error.response.data;
    }

}
const clearCart = async () => {
    try {
        const res = await API.delete('users/clearCart');
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};