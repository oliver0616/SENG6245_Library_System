import axios from "axios";

export function getAllBooks() {
    return axios.post("/api/book/getAllBooks");
}