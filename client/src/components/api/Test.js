import axios from "axios";

export const testConnection = (message) => {
    axios
        .get("/api/test")
        .then(res => {
            console.log(res);
        })
    console.log(message);
}
    
