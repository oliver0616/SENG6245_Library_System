import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const signupNewUser = (userData) => {
    axios
        .post("/api/user/signup", userData)
        .then(res => {
            console.log(res);
        })
}

//Login User
export const loginUser = (userData) => {
    axios
        .post("/api/user/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            //get token and decrypt
            //const t = localStorage.getItem("jwtToken");
            //const decoded = jwt_decode(t);
            //console.log(decoded);
        }).catch(err =>{
            console.log(err);
        });
}
    
