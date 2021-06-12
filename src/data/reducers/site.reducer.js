import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createSiteAPI, deleteSiteAPI,
    getAllSitesAPI, getSiteByIdAPI,
    updateSiteAPI
} from "../services/site.service";

export const getAllSites = createAsyncThunk(
    'site/getAllSites',
    async (payload, thunkAPI) => {
        const response = await getAllSitesAPI();
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const getSiteById = createAsyncThunk(
    'site/getSiteById',
    async (payload, thunkAPI) => {
        const response = await getSiteByIdAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const updateSite = createAsyncThunk(
    'site/updateSite',
    async (payload, thunkAPI) => {
        const response = await updateSiteAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const deleteSite = createAsyncThunk(
    'site/deleteSite',
    async (payload, thunkAPI) => {
        const response = await deleteSiteAPI(payload);
        if (response.isSuccessful === true) {
            return payload;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const createSite = createAsyncThunk(
    'site/createSite',
    async (payload, thunkAPI) => {
        const response = await createSiteAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

const siteSlice = createSlice({
    name: 'site',
    initialState: {
        sites: [],
        selectedSite: {}
    },
    extraReducers: {
        [getAllSites.fulfilled]: (state, action) => {
            state.sites = action.payload
        },
        [getSiteById.fulfilled]: (state, action) => {
            state.selectedSite = action.payload 
        },
        [updateSite.fulfilled]: (state, action) => {
            state.sites = [ ...state.sites.filter(site => site.id !== action.payload.id), action.payload ]
        },
        [deleteSite.fulfilled]: (state, action) => {
            state.sites = [ ...state.sites.filter(site => site.id !== action.payload) ]
        },
        [createSite.fulfilled]: (state, action) => {
            state.sites.push(action.payload);
        }
    }
});

export default siteSlice.reducer;