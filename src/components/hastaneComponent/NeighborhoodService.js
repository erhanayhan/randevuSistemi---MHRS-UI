import axios from "axios";


const USERS_REST_API_URL = 'http://localhost:8080/neighborhoods';

class NeighborhoodService {

    async getAllNeighborhood() {
        const { data } = await axios.get(USERS_REST_API_URL);
        return data

    }
}



export default new NeighborhoodService();