import axios from "axios";

// Simple search using like operator 
export function simpleSearch(bookData) {
    return axios.post("/api/search/simpleSearch", bookData);
}

// Detail search retreive data to server and perform the search
export function detailSearch(bookData) {
    return axios.post("/api/search/detailSearch", bookData);
}