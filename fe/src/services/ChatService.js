import axios from "./custom-axios";

const getRooms = () => {
    return axios.get(`api/Chat/rooms`);
}

export { getRooms };