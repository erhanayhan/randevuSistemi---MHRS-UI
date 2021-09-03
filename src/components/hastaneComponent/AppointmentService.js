import Axios from "axios";

const USERS_REST_API_URL = 'http://localhost:8080/appointments';

class AppointmentService {

    getAllAppointment() {
        console.log();
        // return Axios.get(USERS_REST_API_URL).then(res => res.data.sort((a,b) => a.hospitalName.localeCompare(b.hospitalName)));
        return Axios.get(USERS_REST_API_URL).then(res => res.data);

    }
}


export default new AppointmentService();
