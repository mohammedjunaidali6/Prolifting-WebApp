import { api, getAuthHeaders, get, post, update, del } from "./services.common";

export const getAllCategoriesAPI = async () => {
    let url = `${api}category/getcategories`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const getCategoryByIdAPI = async (categoryId) => {
    let url = `${api}category/getcategory/${categoryId}`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const updateCategoryAPI = async (updateddCategory) => {
    let url = `${api}category/updatecategory`
    let authHeader = getAuthHeaders()
    return await update(url, updateddCategory, { ...authHeader })
}

export const deleteCategoryAPI = async (categoryId) => {
    let url = `${api}category/deletecategory/${categoryId}`
    let authHeader = getAuthHeaders()
    return await del(url, { ...authHeader })
}

export const createCategoryAPI = async (category) => {
    let url = `${api}category/createcategory`
    let authHeader = getAuthHeaders()
    return await post(url, category, { ...authHeader })
}