import axios from "axios";
import jwt_decode from "jwt-decode";

// Submit a issue
export function submitIssue(issueData) {
    return axios.post("/api/issue/submitIssue", issueData);
}

// Get all the issues
export function getAllIsseus() {
    return axios.post("/api/issue/getAllIssues");
}

// Solved issue, delete the issue
export function solvedIssue(issueData) {
    return axios.post("/api/issue/deleteIssue", issueData)
}