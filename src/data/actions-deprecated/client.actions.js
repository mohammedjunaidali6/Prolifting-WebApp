import {
    createClientAPI, deleteClientAPI,
    getAllClientsAPI, getClientByIdAPI,
    updateClientAPI
} from "../services/client.service";
import { errorMessageAction, infoMessageAction, successMessageAction, readyForRequestAction } from "./alert.actions";

export const OPERATION_IN_PROGRESS = "CLIENT_OPERATION_IN_PROGRESS"
export const OPERATION_FAILED = "OPERATION_FAILED"

export const GET_CLIENTS_SUCCESS = "GET_CLIENTS_SUCCESS"
export const GET_CLIENT_SUCCESS = "GET_CLIENT_SUCCESS"
export const UPDATE_CLIENT_SUCCESS = "UPDATE_CLIENT_SUCCESS"
export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS"
export const CREATE_CLIENT_SUCCESS = "CREATE_CLIENT_SUCCESS"


export const getAllClients = () => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getAllClientsAPI();
        if (response.isSuccessful) {
            dispatch(getClientsSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const getClientById = (clientId) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getClientByIdAPI(clientId);
        if (response.isSuccessful) {
            dispatch(getClientSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const updateClient = (updatedClient) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await updateClientAPI(updatedClient);
        if (response.isSuccessful) {
            dispatch(updateClientSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const deleteClient = (clientId) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await deleteClientAPI(clientId);
        if (response.isSuccessful) {
            dispatch(deleteClientSuccessAction())
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const createClient = (client) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await createClientAPI(client);
        if (response.isSuccessful) {
            dispatch(createClientSuccessAction(response.data))
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

const getClientsSuccessAction = (clients) => ({
    type: GET_CLIENTS_SUCCESS,
    payload: {
        clients
    }
})

const getClientSuccessAction = (client) => ({
    type: GET_CLIENT_SUCCESS,
    payload: {
        client
    }
})

const updateClientSuccessAction = (updatedClient) => ({
    type: UPDATE_CLIENT_SUCCESS,
    payload: {
        updatedClient
    }
})

const deleteClientSuccessAction = () => ({
    type: DELETE_CLIENT_SUCCESS
})

const createClientSuccessAction = (createdClient) => ({
    type: CREATE_CLIENT_SUCCESS,
    payload: {
        createdClient
    }
})