import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllUsersAPI, addAdminUserAPI, addUserAPI,
    resetPasswordAPI, resetPasswordWithTokenAPI, forgotPasswordAPI, updateRoleAPI, deactivateUserAPI, reactivateUserAPI, getUserByUsernameAPI
} from "../services/user-management.service";

export const getAllUsers = createAsyncThunk(
    'userManagement/getAllUsers',
    async (payload, thunkAPI) => {
        const response = await getAllUsersAPI();
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const getUserByUsername = createAsyncThunk(
    'userManagement/getUserByUsername',
    async (payload, thunkAPI) => {
        const response = await getUserByUsernameAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
)

export const createAdminUser = createAsyncThunk(
    'userManagement/createAdminUser',
    async (payload, thunkAPI) => {
        const response = await addAdminUserAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'userManagement/createUser',
    async (payload, thunkAPI) => {
        const response = await addUserAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }

);

export const resetPassword = createAsyncThunk(
    'userManagement/resetPassword',
    async (payload, thunkAPI) => {
        const response = await resetPasswordAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const updateRole = createAsyncThunk(
    'userManagement/updateRole',
    async (payload, thunkAPI) => {
        const response = await updateRoleAPI(payload.userName, payload.isAdmin);
        if (response.isSuccessful === true) {
            return payload;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const toggleUserActivation = createAsyncThunk(
    'userManagement/toggleUserActivation',
    async (payload, thunkAPI) => {
        var response = undefined;
        if (payload.isActive === true) {
            response = await deactivateUserAPI(payload.userName);
        } else {
            response = await reactivateUserAPI(payload.userName);
        }

        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
)

export const resetPasswordWithToken = createAsyncThunk(
    'userManagement/resetPasswordWithToken',
    async (payload, thunkAPI) => {
        const response = await resetPasswordWithTokenAPI(payload.credentials, payload.token);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'userManagement/forgotPassword',
    async (payload, thunkAPI) => {
        const response = await forgotPasswordAPI(payload);
        if (response.isSuccessful === true) {
            return response.data;
        } else {
            thunkAPI.rejectWithValue(response.message);
            throw new Error(response.message);
        }
    }
);

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState: {
        users: [],
        selectedUser: {}
    },
    extraReducers: {
        [getAllUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
        },
        [getUserByUsername.fulfilled]: (state, action) => {
            state.selectedUser = action.payload;
        },
        [toggleUserActivation.fulfilled]: (state, action) => {
            state.selectedUser.isActive = (state.selectedUser.isActive === true) ? false : true;
        },
        [updateRole.fulfilled]: (state, action) => {
            state.selectedUser.role = (action.payload.isAdmin === true) ? 'Admin' : 'Site-Manager';
        }
        // [createUser.fulfilled]: (state, action) => {
        //     state.users.push(action.payload);
        // },
        // [createAdminUser.fulfilled]: (state, action) => {
        //     state.users.push(action.payload);
        // },
    }
})

export default userManagementSlice.reducer;