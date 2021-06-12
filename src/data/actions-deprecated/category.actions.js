import {
    createCategoryAPI, deleteCategoryAPI,
    getAllCategoriesAPI, getCategoryByIdAPI,
    updateCategoryAPI
} from "../services/category.service";
import { errorMessageAction, infoMessageAction, successMessageAction, readyForRequestAction } from "./alert.actions";

export const OPERATION_IN_PROGRESS = "CATEGORY_OPERATION_IN_PROGRESS"
export const OPERATION_FAILED = "OPERATION_FAILED"

export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS"
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS"
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS"
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS"
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS"


export const getAllCategories = () => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getAllCategoriesAPI();
        if (response.isSuccessful) {
            dispatch(getCategoriesSuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const getCategoryById = (categoryId) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await getCategoryByIdAPI(categoryId);
        if (response.isSuccessful) {
            dispatch(getCategorySuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const updateCategory = (updatedCategory) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await updateCategoryAPI(updatedCategory);
        if (response.isSuccessful) {
            dispatch(updateCategorySuccessAction(response.data))
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await deleteCategoryAPI(categoryId);
        if (response.isSuccessful) {
            dispatch(deleteCategorySuccessAction())
            dispatch(readyForRequestAction())
        }
        else dispatch(operationFailedAction(response.message))
    }
}

export const createCategory = (category) => {
    return async (dispatch) => {
        dispatch(operationInProgressAction())
        let response = await createCategoryAPI(category);
        if (response.isSuccessful) {
            dispatch(createCategorySuccessAction(response.data))
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

const getCategoriesSuccessAction = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: {
        categories
    }
})

const getCategorySuccessAction = (category) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: {
        category
    }
})

const updateCategorySuccessAction = (updatedCategory) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: {
        updatedCategory
    }
})

const deleteCategorySuccessAction = () => ({
    type: DELETE_CATEGORY_SUCCESS
})

const createCategorySuccessAction = (createdCategory) => ({
    type: CREATE_CATEGORY_SUCCESS,
    payload: {
        createdCategory
    }
})