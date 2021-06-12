import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createClientAPI, deleteClientAPI,
    getAllClientsAPI, getClientByIdAPI,
    updateClientAPI, updateSiteAssociationForClientAPI
} from "../services/client.service";

export const getAllClients = createAsyncThunk(
    'client/getAllClients',
    async (payload, thunkAPI) => {
        const response = await getAllClientsAPI();
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const getClientById = createAsyncThunk(
    'client/getClientById',
    async (payload, thunkAPI) => {
        const response = await getClientByIdAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const updateClient = createAsyncThunk(
    'client/updateClient',
    async (payload, thunkAPI) => {
        const response = await updateClientAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
)

export const deleteClient = createAsyncThunk(
    'client/deleteClient',
    async (payload, thunkAPI) => {
        const response = await deleteClientAPI(payload);
        if (response.isSuccessful === true) {
            return payload;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const createClient = createAsyncThunk(
    'client/createClient',
    async (payload, thunkAPI) => {
        const response = await createClientAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const updateSiteAssociation = createAsyncThunk(
    'client/updateSiteAssociation',
    async (payload, thunkAPI) => {
        const response = await updateSiteAssociationForClientAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
)

const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clients: [],
        selectedClient: {}
    },
    reducers: {
        addSiteToClient: (state, action) => {
            if (state.selectedClient.sites) {
                state.selectedClient.sites.push(action.payload);
            }
        },
        removeSiteFromClient: (state, action) => {
            if (state.selectedClient.sites) {
                state.selectedClient.sites = state.selectedClient.sites.filter(site => site !== action.payload);
            }
        }
    },
    extraReducers: {
        [getAllClients.fulfilled]: (state, action) => {
            state.clients = action.payload
        },
        [getClientById.fulfilled]: (state, action) => {
            state.selectedClient = action.payload 
        },
        [updateClient.fulfilled]: (state, action) => {
            state.clients = [ ...state.clients.filter(client => client.id !== action.payload.id), action.payload ]
        },
        [deleteClient.fulfilled]: (state, action) => {
            state.clients = [ ...state.clients.filter(client => client.id !== action.payload) ]
        },
        [createClient.fulfilled]: (state, action) => {
            state.clients.push(action.payload);
        }
    }
});

export const {
    addSiteToClient,
    removeSiteFromClient,
} = clientSlice.actions;
export default clientSlice.reducer;