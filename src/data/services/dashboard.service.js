import Axios from "axios";
import { api, getAuthHeaders, get, post, update, del, success } from "./services.common";

export const getDashboardDataAPI = async (filterOptions) => {
    let url = `${api}Dashboard/getdashboarddata`;
    let authHeader = getAuthHeaders();
    return await post(url, filterOptions, { ...authHeader });
}

export const getCategoryDashboardDataAPI = async (filterOptions) => {
    let url = `${api}Dashboard/getcategoryovertimedata`;
    let authHeader = getAuthHeaders();
    return await post(url, filterOptions, { ...authHeader });
}