import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardDataAPI, getCategoryDashboardDataAPI } from "../services/dashboard.service";
import moment from "moment";

export const getDashboardData = createAsyncThunk(
    'dashboard/getDashboardData',
    async (payload, thunkAPI) => {
        const response = await getDashboardDataAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const getCategoryDashboardData = createAsyncThunk(
    'dashboard/getCategoryDashboardData',
    async (payload, thunkAPI) => {
        const response = await getCategoryDashboardDataAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        filterOptions: {
            daily: true,
            monthly: false,
            yearly: false,
            startDate: moment().subtract(6, 'M').toISOString(),
            endDate: moment().toISOString(),
            siteId: [],
            clientId: [],
            categoryId: 0
        },
        dashboardData: undefined,
        categoryDashboardData: undefined,
    },
    reducers: {
        setDurationToDaily: (state, action) => {
            state.filterOptions.daily = true;
            state.filterOptions.monthly = false;
            state.filterOptions.yearly = false;
        },
        setDurationToMonthly: (state, action) => {
            state.filterOptions.daily = false;
            state.filterOptions.monthly = true;
            state.filterOptions.yearly = false;
        },
        setDurationToYearly: (state, action) => {
            state.filterOptions.daily = false;
            state.filterOptions.monthly = false;
            state.filterOptions.yearly = true;
        },
        setDurationToStartEndDate: (state, action) => {
            state.filterOptions.startDate = (new Date(action.payload.startDate));
            state.filterOptions.endDate = new Date(action.payload.endDate);
        },
        selectCategory: (state, action) => {
            state.filterOptions.categoryId = action.payload;
        },
        addSiteIdToFilter: (state, action) => {
            state.filterOptions.siteId.push(action.payload);
        },
        removeSiteIdFromFilter: (state, action) => {
            state.filterOptions.siteId = state.filterOptions.siteId.filter(id => id !== action.payload);
        },
        addClientIdToFilter: (state, action) => {
            state.filterOptions.clientId.push(action.payload);
        },
        removeClientIdFromFilter: (state, action) => {
            state.filterOptions.clientId = state.filterOptions.clientId.filter(id => id !== action.payload);
        },
        resetSiteAndClientFromFilter: (state, action) => {
            state.filterOptions.siteId = [];
            state.filterOptions.clientId = [];
        }
    },
    extraReducers: {
        [getDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload;
        },
        [getCategoryDashboardData.fulfilled]: (state, action) => {
            state.categoryDashboardData = action.payload;
        }
    }
})

export const { 
    setDurationToDaily, 
    setDurationToMonthly, 
    setDurationToYearly, 
    setDurationToStartEndDate,
    selectCategory,
    addClientIdToFilter,
    addSiteIdToFilter,
    removeClientIdFromFilter,
    removeSiteIdFromFilter,
    resetSiteAndClientFromFilter,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;