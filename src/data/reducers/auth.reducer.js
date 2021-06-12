import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { loginAuthenticationAPI, signupAuthenticationAPI, checkLoginAPI, logoutUserAPI } from "../services/auth.service";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (payload, thunkAPI) => {
        const response = await loginAuthenticationAPI(payload.username, payload.password)
        if (response.isSuccessful === true) {
            return response.data
        }
        else {
            thunkAPI.rejectWithValue(response.message)
            throw new Error(response.message)
        }
    }
)

export const checkLogin = createAsyncThunk(
    'auth/checkLogin',
    async (payload, thunkAPI) => {
        const loginInfo = checkLoginAPI()
        if (loginInfo.loggedIn) {
            return loginInfo
        }
        else {
            thunkAPI.rejectWithValue('Unauthorized. Please login.')
            throw new Error('Unauthorized. Please login.')
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        logoutUserAPI()
        return true
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {

    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.loggedIn = true
            state.userName = action.payload.userName
        },
        [loginUser.rejected]: (state, action) => {
            state = {}
        },
        [checkLogin.fulfilled]: (state, action) => {
            state.loggedIn = true
            state.userName = action.payload.userName
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.loggedIn = false
        }
    }
})

export const {

} = authSlice.actions

export default authSlice.reducer