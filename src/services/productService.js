
import conf from '../conf/conf';
import axios from 'axios';

const API_URL = conf.API_URL;

// Function to fetch all products
const getAllProducts = async (page=1,limit=10) => {
  try {
    const response = await axios.get(`${API_URL}/products/getAllProducts?page=${page}&limit=${limit}`);
    if(!response){
        console.log('No products found');
    }
    console.log('API Response:', response.data);
  
    return response.data; // Returning the product data
  } catch (error) {
    console.error('Error fetching products:', error);
    console.log(error.message)
    throw new Error('Failed to fetch products');
  }
};

const getProductDetails = async (productId)=>{
  try {
    console.log("product_ID",productId)
    const res = await axios.get(`${API_URL}/products/getProductDetails/${productId}`)
    if(!res){
      console.log('Product not found')
    }
    console.log("Product Details:",res.data)
    return res.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    console.log(error.message)
    throw new Error('Failed to fetch product details');
  }
}


export {
    getAllProducts,
    getProductDetails
}
