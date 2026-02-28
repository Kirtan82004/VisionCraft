import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/admin/productService";

/* ================= THUNKS ================= */

// GET ALL PRODUCTS
export const fetchAdminProducts = createAsyncThunk(
  "adminProduct/fetchAll",
  async ({ category, inStock }, { rejectWithValue }) => {
    try {
      return await getProducts(category, inStock);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// GET PRODUCT BY ID
export const fetchAdminProductById = createAsyncThunk(
  "adminProduct/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      return await getProductById(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// CREATE PRODUCT
export const createAdminProduct = createAsyncThunk(
  "adminProduct/create",
  async (productData, { rejectWithValue }) => {
    try {
      return await createProduct(productData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE PRODUCT
export const updateAdminProduct = createAsyncThunk(
  "adminProduct/update",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      return await updateProduct(productId, productData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE PRODUCT
export const deleteAdminProduct = createAsyncThunk(
  "adminProduct/delete",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProduct(productId);
      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================= SLICE ================= */

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearAdminProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH ALL ===== */
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FETCH BY ID ===== */
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      /* ===== CREATE ===== */
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      /* ===== UPDATE ===== */
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      /* ===== DELETE ===== */
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export const { clearAdminProducts } = adminProductSlice.actions;
export default adminProductSlice.reducer;
