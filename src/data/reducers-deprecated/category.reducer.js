import { 
    OPERATION_IN_PROGRESS,
    OPERATION_FAILED,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_SUCCESS
 } from "../actions/category.actions";
 
 import { READY_FOR_REQUEST } from "../actions/alert.actions";

 const initialState = {}

 export default function category(state = initialState, action) {
     switch(action.type) {
        case OPERATION_IN_PROGRESS:
            return { ...state, loading: true, operationCompleted: false}
        case OPERATION_FAILED:
            return { ...state, loading: false, operationCompleted: false, ...action.payload}
        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload}
        case GET_CATEGORY_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload}
        case UPDATE_CATEGORY_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload}
        case DELETE_CATEGORY_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload}
        case CREATE_CATEGORY_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload}
        case READY_FOR_REQUEST:
            return { ...state, operationCompleted: false }
        default:
            return state
     }
 }