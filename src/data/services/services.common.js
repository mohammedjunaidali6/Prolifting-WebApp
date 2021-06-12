import axios from 'axios';
import { constants } from "../../config.js";

export const api = constants.endpoint
export const error = (error) => { return { status: "error", isSuccessful: false, message: error } }
export const success = (data) => { return { status: "success", isSuccessful: true, data: data } }

export const getAuthHeaders = () => { return { 'Authorization': 'Bearer ' + localStorage.getItem(constants.KEY_AUTH_TOKEN) } }

export const get = async (url, headers) => {
    try {
        let response = await axios.get(url, { headers })
        if (response.data.httpStatus === 200) {
            return success(response.data.data)
        }
        else {
            return error(response.data.statusMessage);
        }
    }
    catch (e) {
        console.log(e)
        if (e.response.data) {
            return error(e.response.data.statusMessage);
        }
        return error(e)
    }
}

export const post = async (url, data, headers) => {
    try {
        let response = await axios.post(url, data, { headers })
        if (response.data.httpStatus === 200) {
            return success(response.data.data)
        }
        else {
            return error(response.data.statusMessage);
        }
    }
    catch (e) {
        console.log(e)
        if (e.response.data) {
            return error(e.response.data.statusMessage);
        }
        return error(e)
    }
}

export const download = async (url, data, headers) => {
    try {
        let response = await axios.post(url, data, { headers, responseType: 'blob' })
        return success(response.data)
    }
    catch (e) {
        console.log(e)
        if (e.response.data) {
            return error(e.response.data.statusMessage);
        }
        return error(e)
    }
}

export const update = async (url, data, headers) => {
    try {
        let response = await axios.put(url, data, { headers })
        if (response.data.httpStatus === 200) {
            return success(response.data.data)
        }
        else {
            return error(response.data.statusMessage);
        }
    }
    catch (e) {
        console.log(e)
        if (e.response.data) {
            return error(e.response.data.statusMessage);
        }
        return error(e)
    }
}

export const del = async (url, headers) => {
    try {
        let response = await axios.delete(url, { headers })
        if (response.data.httpStatus === 200) {
            return success(response.data.data)
        }
        else {
            return error(response.data.statusMessage);
        }
    }
    catch (e) {
        console.log(e)
        if (e.response.data) {
            return error(e.response.data.statusMessage);
        }
        return error(e)
    }
}