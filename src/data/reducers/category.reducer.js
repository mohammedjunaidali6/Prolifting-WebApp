import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
    createCategoryAPI, deleteCategoryAPI,
    getAllCategoriesAPI, getCategoryByIdAPI,
    updateCategoryAPI
} from "../services/category.service";

export const getAllCategories = createAsyncThunk(
    'category/getAllCategories',
    async (payload, thunkAPI) => {
        const response = await getAllCategoriesAPI();
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const getCategoryById = createAsyncThunk(
    'category/getCategoryById',
    async (payload, thunkAPI) => {
        const response = await getCategoryByIdAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (payload, thunkAPI) => {
        const response = await updateCategoryAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (payload, thunkAPI) => {
        const response = await deleteCategoryAPI(payload);
        if (response.isSuccessful === true) {
            return payload;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (payload, thunkAPI) => {
        const response = await createCategoryAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        selectedCategory: {}
    },
    extraReducers: {
        [getAllCategories.fulfilled]: (state, action) => {
            state.categories = action.payload
        },
        [getCategoryById.fulfilled]: (state, action) => {
            state.selectedCategory = action.payload 
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.categories = [ ...state.categories.filter(category => category.id !== action.payload.id), action.payload ]
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.categories = [ ...state.categories.filter(category => category.id !== parseInt(action.payload)) ]
        },
        [createCategory.fulfilled]: (state, action) => {
            state.categories.push(action.payload);
        }
    }
})

export default categorySlice.reducer;