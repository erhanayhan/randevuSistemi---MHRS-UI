import axios from "axios";


const USERS_REST_API_URL = 'http://localhost:8080/citys';

class CityService {

    async getAllCity() {
        const { data } = await axios.get(USERS_REST_API_URL);
        return data

    }
}
export default new CityService();
