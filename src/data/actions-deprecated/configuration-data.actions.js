import { 
    getAllDropdownsAPI, addNewEquipmentCategoryAPI, addNewModelOutputAPI
} from "../services/configuration-data.service";

export const OPERATION_IN_PROGRESS = "CONFIGURATION_CHANGE_OPERATION_IN_PROGRESS"
export const OPERATION_FAILED = "OPERATION_FAILED"

export const GET_DROPDOWNS_SUCCESS = "GET_DROPDOWNS_SUCCESS"

export const getAllDropdowns = () => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getAllDropdownsAPI()
        if (response.isSuccessful) dispatch(getDropdownsSuccessAction(response.data))
        else dispatch(operationFailedAction(response.message))
    }
}

export const addNewEquipmentCategory = (equipmentCategory) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await addNewEquipmentCategoryAPI(equipmentCategory)
        if (response.isSuccessful) dispatch(getAllDropdowns())
        else dispatch(operationFailedAction(response.message))
    }
}

export const addNewModelOutput = (modelOutput) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await addNewModelOutputAPI(modelOutput)
        if (response.isSuccessful) dispatch(getAllDropdowns())
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

const getDropdownsSuccessAction = (dropdowns) => ({
    type: GET_DROPDOWNS_SUCCESS,
    payload: {
        dropdowns
    }
})