import API from "../../utils/axiosInstance";

const getAllCustomers = async ()=>{
    try {
        console.log("getting all customers")
        const res = await API.get("admin/users")
        console.log("res in service customers",res)
        return res.data
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const getCustomerById = async(userId)=>{
    try {
        console.log("running user by id")
        const res = await API.get(`admin/users/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
const updateCustomer = async (userId,user)=>{
    try {
        console.log("customer updating")
        const res = await API.post(`admin/users/${userId}`,{user})
        return await res.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

const deleteCustomer = async (userId)=>{
    try {
        console.log("customer deleting")
        const res = await API.delete(`admin/users/${userId}`)
        
        return res.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export {
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerById
}