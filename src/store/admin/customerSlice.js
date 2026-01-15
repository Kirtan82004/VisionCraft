import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
} from "../../services/admin/customerService";

/* ======================================================
   THUNKS
====================================================== */

// 🔹 Get all customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCustomers();
      console.log("res in slice",res)
      return res.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch customers"
      );
    }
  }
);

// 🔹 Get single customer by ID
export const fetchCustomerById = createAsyncThunk(
  "customers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCustomerById(id);
      return res.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch customer"
      );
    }
  }
);

// 🔹 Delete customer
export const deleteCustomerById = createAsyncThunk(
  "customers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCustomer(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete customer"
      );
    }
  }
);

/* ======================================================
   SLICE
====================================================== */

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH ALL ================= */
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH BY ID ================= */
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deleteCustomerById.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export const { clearSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
