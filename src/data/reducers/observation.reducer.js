import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getObservationsAPI, downloadImageAPI
} from "../services/observation.service";
import fileDownload from 'js-file-download';

export const getAllObservations = createAsyncThunk(
    'observation/getAllObservation',
    async (payload, thunkAPI) => {
        const response = await getObservationsAPI();
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const fetchImage = createAsyncThunk(
    'observation/fetchImage',
    async (payload, thunkAPI) => {
        const response = await downloadImageAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const downloadImage = createAsyncThunk(
    'observation/downloadImage',
    async (payload, thunkAPI) => {
        const response = await downloadImageAPI(payload);
        if (response.isSuccessful === true) {
            fileDownload(response.data, payload.fileName);
        }
    }
)

const observationSlice = createSlice({
    name: 'observation',
    initialState: {
        observations: []
    },
    extraReducers: {
        [getAllObservations.fulfilled]: (state, action) => {
            state.observations = action.payload;
        }
    }
});

export default observationSlice.reducer;