import axios from "axios";

// Create a new account using userData
export function simpleSearch(bookData) {
    return axios.post("/api/search/simpleSearch", bookData);
}