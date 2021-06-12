import {
    getAllUsersAPI, addAdminUserAPI, addUserAPI,
    resetPasswordAPI, resetPasswordWithTokenAPI, forgotPasswordAPI
} from "../services/user-management.service";
import { errorMessageAction, infoMessageAction, successMessageAction, readyForRequestAction } from "./alert.actions";

export const OPERATION_IN_PROGRESS = "USER_OPERATION_IN_PROGRESS"
export const OPERATION_FAILED = "OPERATION_FAILED"

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const CREATE_ADMIN_SUCCESS = "CREATE_ADMIN_SUCCESS"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS"

export const getAllUsers = () => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getAllUsersAPI();
        if (response.isSuccessful) {
            dispatch(getUsersSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const createAdminUser = (userInfo) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await addAdminUserAPI(userInfo);
        if (response.isSuccessful) {
            dispatch(createAdminSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const createUser = (userInfo) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await addUserAPI(userInfo)
        if (response.isSuccessful) {
            dispatch(createUserSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const resetPassword = (credentials) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await resetPasswordAPI(credentials)
        if (response.isSuccessful) {
            dispatch(resetPasswordSuccessAction())
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const resetPasswordWithToken = (credentials, token) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await resetPasswordWithTokenAPI(credentials)
        if (response.isSuccessful) {
            dispatch(resetPasswordSuccessAction())
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const forgotPassword = (email) => {
    return async (dispatch) => {
        let response = await forgotPasswordAPI(email)
        if (response.isSuccessful) {
            dispatch(forgotPasswordSuccessAction())
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

const operationInProgressAction = () => ({
    type: OPERATION_IN_PROGRESS
})

const operationFailedAction = (error) => ({
    type: OPERATION_FAILED,
    payload: {
        error
    }
})

const getUsersSuccessAction = (users) => ({
    type: GET_USERS_SUCCESS,
    payload: {
        users
    }
})

const createAdminSuccessAction = (createdAdmin) => ({
    type: CREATE_ADMIN_SUCCESS,
    payload: {
        createdAdmin
    }
})

const createUserSuccessAction = (createdUser) => ({
    type: CREATE_USER_SUCCESS,
    payload: {
        createdUser
    }
})

const resetPasswordSuccessAction = () => ({
    type: RESET_PASSWORD_SUCCESS
})

const forgotPasswordSuccessAction = () => ({
    type: FORGOT_PASSWORD_SUCCESS
})