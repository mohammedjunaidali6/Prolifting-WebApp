import { api, getAuthHeaders, get, post, update, del } from "./services.common";

export const getAllDropdownsAPI = async () => {
    let url = `${api}sitemanagement/getdropdownvalues`
    let authHeaders = getAuthHeaders()
    return await get(url, { ...authHeaders })
}

export const getMasterDataAPI = async () => {
    let url = `${api}user/getmasterdata`
    let authHeaders = getAuthHeaders()
    return await get(url, { ...authHeaders })
}