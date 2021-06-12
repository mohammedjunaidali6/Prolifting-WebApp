import { 
    OPERATION_IN_PROGRESS,
    OPERATION_FAILED,
    GET_CLIENTS_SUCCESS,
    GET_CLIENT_SUCCESS,
    UPDATE_CLIENT_SUCCESS,
    DELETE_CLIENT_SUCCESS,
    CREATE_CLIENT_SUCCESS
 } from "../actions/client.actions";

 import { READY_FOR_REQUEST } from "../actions/alert.actions";

 const initialState = {}

 export default function client(state = initialState, action) {
     switch(action.type) {
        case OPERATION_IN_PROGRESS:
            return { ...state, loading: true, operationCompleted: false}
        case OPERATION_FAILED:
            return { ...state, loading: false, operationCompleted: false, ...action.payload}
        case GET_CLIENTS_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload}
        case GET_CLIENT_SUCCESS:
            return { ...state, loading: false, operationCompleted: false, ...action.payload}
        case UPDATE_CLIENT_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload}
        case DELETE_CLIENT_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload}
        case CREATE_CLIENT_SUCCESS:
            return { ...state, loading: false, operationCompleted: true,  ...action.payload}
        case READY_FOR_REQUEST:
            return { ...state, operationCompleted: false }
        default:
            return state
     }
 }