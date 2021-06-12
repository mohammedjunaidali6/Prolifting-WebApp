import { api, getAuthHeaders, get, post, update, del, download } from "./services.common";

export const getObservationsAPI = async () => {
    let url = `${api}sitemanagement/getsitesmanagement`;
    let authHeader = getAuthHeaders();
    return await get(url, { ...authHeader });
};

export const downloadImageAPI = async (documentRequest) => {
    let url = `${api}SiteManagement/DownloadFile`;
    let authHeader = getAuthHeaders();
    return await download(url, documentRequest, { ...authHeader });
}