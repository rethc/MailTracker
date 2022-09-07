import axios from "axios";

const API_PROD_BASE_URL = "https://mailtrackerapi.azurewebsites.net/api/"
const API_DEV_BASE_URL = "http://localhost:5243/api/"

export const api = endpoint => {
    let url = API_PROD_BASE_URL + endpoint + "/";

    return {
        getMail: () => axios.get(url),
        getMailbyID: id => axios.get(url + id), 
        getIncomingTotal: () => axios.get(url),
        getOutgoingTotal: () => axios.get(url),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url +id)
    }
}   

export default api;