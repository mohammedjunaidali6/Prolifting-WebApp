import {
    OPERATION_IN_PROGRESS,
    OPERATION_FAILED,
    GET_DROPDOWNS_SUCCESS
} from '../actions/configuration-data.actions'

const initialState = {}

export default function configuration(state = initialState, action) {
    switch (action.type) {
        case OPERATION_IN_PROGRESS:
            return { ...state, loading: true }
        case OPERATION_FAILED:
            return { ...state, loading: false }
        case GET_DROPDOWNS_SUCCESS:
            return { ...state, loading: false, ...action.payload}
        default:
            return state
    }
}