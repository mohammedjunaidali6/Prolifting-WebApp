import { 
    OPERATION_IN_PROGRESS,
    OPERATION_FAILED,
    GET_SITES_SUCCESS,
    GET_SITE_SUCCESS,
    UPDATE_SITE_SUCCESS,
    DELETE_SITE_SUCCESS,
    CREATE_SITE_SUCCESS
 } from "../actions/site.actions";

 import { READY_FOR_REQUEST } from "../actions/alert.actions";

 const initialState = {}

 export default function site(state = initialState, action) {
     switch(action.type) {
        case OPERATION_IN_PROGRESS:
            return { ...state, loading: true, operationCompleted: false}
        case OPERATION_FAILED:
            return { ...state, loading: false, operationCompleted: false, ...action.payload }
        case GET_SITES_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload }
        case GET_SITE_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload }
        case UPDATE_SITE_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload }
        case DELETE_SITE_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload }
        case CREATE_SITE_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload }
        case READY_FOR_REQUEST:
            return { ...state, operationCompleted: false }
        default:
            return state
     }
 }