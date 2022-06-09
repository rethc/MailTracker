import axios from "axios";

export const createAPIEndpoint = endpoint => {

    //Local DB
    let urlLocal = 'http://localhost:5243/api/' + endpoint + "/";

    //Production
    let url = 'https://mailtrackerapi.azurewebsites.net/api/' + endpoint + "/";
    return {
        fetchAll: () => axios.get(urlLocal),
        fetchById: id => axios.get(urlLocal + id),
        create: newRecord => axios.post(urlLocal, newRecord),
        update: (id, updatedRecord) => axios.put(urlLocal + id, updatedRecord),
        delete: id => axios.delete(urlLocal + id)
    }
}

export default createAPIEndpoint;