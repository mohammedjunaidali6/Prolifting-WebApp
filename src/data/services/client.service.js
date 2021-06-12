import { api, getAuthHeaders, get, post, update, del } from "./services.common";

export const getAllClientsAPI = async () => {
    let url = `${api}client/getclients`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const getClientByIdAPI = async (clientId) => {
    let url = `${api}client/getclient/${clientId}`
    let authHeader = getAuthHeaders()
    return await get(url, { ...authHeader })
}

export const updateClientAPI = async (updatedClient) => {
    let url = `${api}client/updateclient`
    let authHeader = getAuthHeaders()
    return await update(url, updatedClient, { ...authHeader })
}

export const deleteClientAPI = async (clientId) => {
    let url = `${api}client/deleteclient/${clientId}`
    let authHeader = getAuthHeaders()
    return await del(url, { ...authHeader })
}

export const createClientAPI = async (client) => {
    let url = `${api}client/createclient`
    let authHeader = getAuthHeaders()
    return await post(url, client, { ...authHeader })
}

export const updateSiteAssociationForClientAPI = async (client) => {
    let url = `${api}sitemanagement/updateclientsiterelation`;
    let authHeader = getAuthHeaders();
    return await post(url, client, { ...authHeader });
}