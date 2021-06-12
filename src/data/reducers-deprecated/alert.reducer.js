import {
    INFO_MESSAGE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
    READY_FOR_REQUEST
} from '../actions/alert.actions'

const initialState = {}

export default function alert(state = initialState, action) {
    switch (action.type) {
        case INFO_MESSAGE:
            return { ...state, ...action.payload }
        case SUCCESS_MESSAGE:
            return { ...state, ...action.payload }
        case ERROR_MESSAGE:
            return { ...state, ...action.payload }
        case READY_FOR_REQUEST:
        default:
            return state
    }
}