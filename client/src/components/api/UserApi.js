import axios from "axios";

export function signupNewUser(userData) {
    return axios.post("/api/user/signup", userData);
}

export function loginUser(userData) {
    return axios.post("/api/user/login", userData);
}
    
