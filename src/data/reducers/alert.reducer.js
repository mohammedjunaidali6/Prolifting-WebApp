import { createSlice } from "@reduxjs/toolkit"

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {

    },
    reducers: {
        infoMessage: (state, action) => {
            state.infoMessage = {
                message: action.payload,
                timestamp: new Date()
            }
        },
        successMessage: (state, action) => {
            state.successMessage = {
                message: action.payload,
                timestamp: new Date()
            }
        },
        errorMessage: (state, action) => {
            state.dangerMessage = {
                message: action.payload,
                timestamp: new Date()
            }
        }
    }
})

export const {
    infoMessage, successMessage, errorMessage
} = alertsSlice.actions

export default alertsSlice.reducer