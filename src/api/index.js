import axios from "../utils/request";

import path from "./path"


const api = {
    getClipboard() {
        return axios.get(path.baseUrl + path.getclipboard)
    },
    updClipboard(data) {
        return axios.post(path.baseUrl + path.updclipboard, data)
    },
    getLogs() {
        return axios.get(path.baseUrl + path.getLogs)
    }
}

export default api
