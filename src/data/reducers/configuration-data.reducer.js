import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getAllDropdownsAPI,
} from "../services/configuration-data.service";

export const getAllDropdowns = createAsyncThunk(
    'configurationData/getAllDropdowns',
    async (payload, thunkAPI) => {
        let response = await getAllDropdownsAPI();
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

const configurationDataSlice = createSlice({
    name: 'configurationData',
    initialState: {
        clients: [],
        sites: [],
        categories: []
    },
    extraReducers: {
        [getAllDropdowns.fulfilled]: (state, action) => {
            state.clients = action.payload?.clients;
            state.sites = action.payload?.sites;
            state.categories = action.payload?.categories;
        }
    }
});

export default configurationDataSlice.reducer;