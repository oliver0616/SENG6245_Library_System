import axios from "axios";

// Create a new account using userData
export function signupNewUser(userData) {
    return axios.post("/api/user/signup", userData);
}

// Sign user in using userData
export function loginUser(userData) {
    return axios.post("/api/user/login", userData);
}

// Change user password using passwordData
export function changePassword(passwordData) {
    return axios.post("/api/user/changePassword", passwordData);
}
    
