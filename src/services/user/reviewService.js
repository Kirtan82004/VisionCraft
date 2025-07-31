import API from "../../utils/axiosInstance";

const addProductReview = async (productId, reviewData) => {
    try {
        const res = await API.post(`users/addProductReview/${productId}`, reviewData);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const getProductReviews = async (productId) => {
    try {
        const res = await API.get(`users/getProductReviews/${productId}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const deleteProductReview = async (reviewId) => {
    try {
        const res = await API.delete(`users/deleteProductReview/${reviewId}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const editProductReview = async(reviewId,comment)=>{
    try {
        const res = await API.put(`users/editProductReview/${reviewId}`,comment);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export {
    addProductReview,
    getProductReviews,
    deleteProductReview,
    editProductReview
};