import {
    OPERATION_IN_PROGRESS,
    OPERATION_FAILED,
    GET_USERS_SUCCESS,
    CREATE_ADMIN_SUCCESS,
    CREATE_USER_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_SUCCESS
} from "../actions/user-management.actions";

import { READY_FOR_REQUEST } from "../actions/alert.actions";

const initialState = {}

export default function userManagement(state = initialState, action) {
    switch (action.type) {
        case OPERATION_IN_PROGRESS:
            return { ...state, loading: true, operationCompleted: false }
        case OPERATION_FAILED:
            return { ...state, loading: false, operationCompleted: false, ...action.payload }
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload }
        case CREATE_ADMIN_SUCCESS:
            return { ...state, loading: false, operationCompleted: true, ...action.payload }
        case CREATE_USER_SUCCESS:
            return { ...state, loading: false, operationCompleted: true, ...action.payload }
        case RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false, operationCompleted: true }
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false, operationCompleted: true }
        case READY_FOR_REQUEST:
            return { ...state, operationCompleted: false }
        default:
            return state
    }
}