import { api, getAuthHeaders, get, post, update, del } from "./services.common";

export const getAllSitesAPI = async () => {
    let url = `${api}sites/getsites`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const getSiteByIdAPI = async (siteId) => {
    let url = `${api}sites/getsite/${siteId}`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const updateSiteAPI = async (updatedSite) => {
    let url = `${api}sites/updatesite`
    let authHeader = getAuthHeaders()
    return await update(url, updatedSite, { ...authHeader })
}

export const deleteSiteAPI = async (siteId) => {
    let url = `${api}sites/deletesite/${siteId}`
    let authHeader = getAuthHeaders()
    return await del(url, { ...authHeader })
}

export const createSiteAPI = async (site) => {
    let url = `${api}sites/createsite`
    let authHeader = getAuthHeaders()
    return await post(url, site, { ...authHeader })
}