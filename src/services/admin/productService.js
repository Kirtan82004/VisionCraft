import API from "../../utils/axiosInstance";

const getProducts = async (category, inStock) => {
    try {
        const res = await API.get('admin/product/get-all-products',{params:{category, inStock}});
        console.log("ProductServiceRes", res);
        return res.data.data;

    }
    catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const getProductById = async (productId) => {
    try {
        const res = await API.get(`admin/product/get-product-byId/${productId}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }  
}
const updateProduct = async (productId, productData) => {
    try {
        const res = await API.put(`admin/product/update/${productId}`, productData);

        return res.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const deleteProduct = async (productId) => {
    try {
        const res = await API.delete(`admin/product/delete/${productId}`);
        console.log("DeleteProductRes", res);
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const createProduct = async (productData) => {
    try {
        const res = await API.post('admin/product/create', productData);
        console.log("CreateProductRes", res);
        window.alert("Product created successfully");
        return res.data;
    }
    catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
}