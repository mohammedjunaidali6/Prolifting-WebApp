import { api, getAuthHeaders, get, post, update, del } from "./services.common";

export const getAllUsersAPI = async () => {
    let url = `${api}user/getusers`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const getUserByUsernameAPI = async (username) => {
    let url = `${api}authenticate/getuserdetailsbyusername`;
    let authHeader = getAuthHeaders();
    return await post(url, { userName: username }, { ...authHeader });
}

export const addAdminUserAPI = async (userInfo) => {
    let url = `${api}authenticate/register-admin`
    let authHeader = getAuthHeaders()
    return await post(url, userInfo, { ...authHeader })
}

export const addUserAPI = async (userInfo) => {
    let url = `${api}authenticate/register`
    let authHeader = getAuthHeaders()
    return await post(url, userInfo, { ...authHeader })
}

export const resetPasswordAPI = async (credentials) => {
    let url = `${api}authenticate/resetpasswordapp`
    let authHeader = getAuthHeaders()
    return await post(url, credentials, { ...authHeader })
}

export const resetPasswordWithTokenAPI = async (credentials, token) => {
    let url = `${api}authenticate/resetpassword`
    // let authHeader = { 'Authorization': 'Bearer ' + token }
    return await post(url, { ...credentials, token })
}

export const forgotPasswordAPI = async (email) => {
    let url = `${api}authenticate/forgotpassword`
    let authHeader = getAuthHeaders()
    return await post(url, email, { ...authHeader })
}

export const updateRoleAPI = async (userName, isAdmin) => {
    let url = `${api}authenticate/updaterole`;
    let authHeader = getAuthHeaders();
    return await post(url, { userName, isAdmin }, { ...authHeader });
}

export const deactivateUserAPI = async (userName) => {
    let url = `${api}authenticate/deleteuser`;
    let authHeader = getAuthHeaders();
    return await post(url, { userName }, { ...authHeader });
}

export const reactivateUserAPI = async (userName) => {
    let url = `${api}authenticate/reactivate`;
    let authHeader = getAuthHeaders();
    return await post(url, { userName }, { ...authHeader });
}