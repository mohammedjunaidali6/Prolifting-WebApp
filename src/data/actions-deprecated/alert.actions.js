export const INFO_MESSAGE = "INFO_MESSAGE"
export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE"
export const ERROR_MESSAGE = "ERROR_MESSAGE"
export const READY_FOR_REQUEST = "READY_FOR_REQUEST"

export const infoMessageAction = (infoMessage) => {
    return {
        type: INFO_MESSAGE,
        payload: { 
            infoMessage: {
                message: infoMessage,
                timestamp: new Date()
            }
        }
    }
}

export const successMessageAction = (successMessage) => {
    return {
        type: SUCCESS_MESSAGE,
        payload: {
            successMessage: {
                message: successMessage,
                timestamp: new Date()
            } 
        }
    }
}

export const errorMessageAction = (errorMessage) => {
    return {
        type: INFO_MESSAGE,
        payload: {
            errorMessage: {
                message: errorMessage,
                timestamp: new Date()
            }
        }
    }
}

export const readyForRequestAction = () => {
    return {
        type: READY_FOR_REQUEST
    }
}