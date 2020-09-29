import axios from "axios";

// Get all the books from database
export function getAllBooks() {
    return axios.post("/api/book/getAllBooks");
}

// Get detail of the book, using bookId
export function getBookDetail(bookId) {
    return axios.post("/api/book/getBookById", bookId);
}

// Check if current book is like/liked
export function checkLikeBook(bookId) {
    return axios.post("/api/history/checkLikeBook", bookId);
}

// Like a book, given userId and bookId
export function likeBook(likeData) {
    return axios.post("/api/history/likeBook", likeData);
}

// Remove like from a book, given userId and bookId
export function removeLikeBook(likeData) {
    return axios.post("/api/history/removeLikeBook", likeData);
}

// Add download history record
export function addDownloadRecord(userData) {
    return axios.post("/api/history/addDownloadHistory", userData);
}

// Get all view history for this user
export function getViewHistory(userId) {
    return axios.post("/api/history/getViewHistory", userId)
}

// Add/Update view book history
export function addUpdateViewHistory(userData) {
    return axios.post("/api/history/addUpdateViewHistory", userData);
}