import axios from "axios";
import Axios from "axios";

const USERS_REST_API_URL = 'http://localhost:8080/address';

class AdresService {
}

const address = {}

address.create = async (state) => {

    const dataPost = {
        name: state.addressName,
    }


    const urlPost = USERS_REST_API_URL + "/adrescreate"

    const res = await axios.post(urlPost, dataPost)
        .then(response => {
            const data = { success: true, message: response.data }
            return data;
        })
        .catch(error => {
            const data = { success: false, message: error.response.data }
            return data;
        })
    return res;

}



export default new AdresService();
