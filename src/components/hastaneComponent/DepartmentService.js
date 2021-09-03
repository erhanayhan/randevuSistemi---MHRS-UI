import axios from "axios";


const USERS_REST_API_URL = 'http://localhost:8080/departmans';

class DepartmentService {

    async getAllDepartman() {
        const { data } = await axios.get(USERS_REST_API_URL);
        return data

    }
}




export default new DepartmentService();
