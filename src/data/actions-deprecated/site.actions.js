import {
    createSiteAPI, deleteSiteAPI,
    getAllSitesAPI, getSiteByIdAPI,
    updateSiteAPI
} from "../services/site.service";
import { errorMessageAction, infoMessageAction, successMessageAction, readyForRequestAction } from "./alert.actions";

export const OPERATION_IN_PROGRESS = "SITE_OPERATION_IN_PROGRESS"
export const OPERATION_FAILED = "OPERATION_FAILED"

export const GET_SITES_SUCCESS = "GET_SITES_SUCCESS"
export const GET_SITE_SUCCESS = "GET_SITE_SUCCESS"
export const UPDATE_SITE_SUCCESS = "UPDATE_SITE_SUCCESS"
export const DELETE_SITE_SUCCESS = "DELETE_SITE_SUCCESS"
export const CREATE_SITE_SUCCESS = "CREATE_SITE_SUCCESS"


export const getAllSites = () => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getAllSitesAPI();
        if (response.isSuccessful) {
            dispatch(getSitesSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const getSiteById = (siteId) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getSiteByIdAPI(siteId);
        if (response.isSuccessful) {
            dispatch(getSiteSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const updateSite = (updatedSite) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await updateSiteAPI(updatedSite);
        if (response.isSuccessful) {
            dispatch(updateSiteSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const deleteSite = (siteId) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await deleteSiteAPI(siteId);
        if (response.isSuccessful) {
            dispatch(deleteSiteSuccessAction())
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const createSite = (site) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await createSiteAPI(site);
        if (response.isSuccessful) {
            dispatch(createSiteSuccessAction(response.data))
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

const getSitesSuccessAction = (sites) => ({
    type: GET_SITES_SUCCESS,
    payload: {
        sites
    }
})

const getSiteSuccessAction = (site) => ({
    type: GET_SITE_SUCCESS,
    payload: {
        site
    }
})

const updateSiteSuccessAction = (updatedSite) => ({
    type: UPDATE_SITE_SUCCESS,
    payload: {
        updatedSite
    }
})

const deleteSiteSuccessAction = () => ({
    type: DELETE_SITE_SUCCESS
})

const createSiteSuccessAction = (createdSite) => ({
    type: CREATE_SITE_SUCCESS,
    payload: {
        createdSite
    }
})