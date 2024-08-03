import axios from "./custom-axios";

const login = (Email, Password) => {
    return axios.post("api/Auth/login", {Email, Password});
}

export default { login };