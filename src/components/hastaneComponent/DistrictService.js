import axios from "axios";


const USERS_REST_API_URL = 'http://localhost:8080/districts';

class DistrictService {

    async getAllDistrict() {
        const { data } = await axios.get(USERS_REST_API_URL);
        return data

    }
}




export default new DistrictService();