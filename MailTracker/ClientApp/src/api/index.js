import axios from "axios";

export const createAPIEndpoint = endpoint => {
    let url = 'https://mailtrackerapi.azurewebsites.net/api/' + endpoint + "/";
    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        create : newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
}

export default createAPIEndpoint;