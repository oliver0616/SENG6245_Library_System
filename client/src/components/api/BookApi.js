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

// Get all like history for this user
export function getLikeHistory(userId) {
    return axios.post("/api/history/getLikeHistory", userId);
}

// Like a book, given userId and bookId
export function likeBook(likeData) {
    return axios.post("/api/history/likeBook", likeData);
}

// Remove like from a book, given userId and bookId
export function removeLikeBook(likeData) {
    return axios.post("/api/history/removeLikeBook", likeData);
}

// Get all download history for this user
export function getDownloadHistory(userId) {
    return axios.post("/api/history/getDownloadHistory", userId);
}

// Add download history record
export function addDownloadRecord(userData) {
    return axios.post("/api/history/addDownloadHistory", userData);
}

// Get all view history for this user
export function getViewHistory(userId) {
    return axios.post("/api/history/getViewHistory", userId);
}

// Add/Update view book history
export function addUpdateViewHistory(userData) {
    return axios.post("/api/history/addUpdateViewHistory", userData);
}

// Add new book
export function addNewBook(bookData) {
    return axios.post("/api/book/addNewBook", bookData);
}

// Upload book cover image
export function uploadBookCover(bookData) {
    return axios.post("/api/book/uploadBookCover", bookData);
}

// Upload book pdf
export function uploadBookPdf(bookData) {
    return axios.post("/api/book/uploadBookPdf", bookData);
}