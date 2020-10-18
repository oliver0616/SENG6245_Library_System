import React from 'react';
import {Container, Table} from 'react-bootstrap';

import {getAllIsseus} from "../api/IssueApi";

export default class AllIssues extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: []
        }
    }

    componentDidMount() {
        getAllIsseus().then(res => {
            this.setState({
                issues: res.data.issues
            })
        })
    }

    // This method redirect page to viewing detail of the issue
    viewIssueDetail(issue) {
        console.log(issue);
        this.props.history.push({
            pathname: `/issuedetail/${issue.issueid}`,
            state: {issueDetail: issue}
        });
    }

    render() {
        return(
            <Container className = "container-allUser">
            <h1> Issues </h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Issue Id</th>
                    <th>Priority</th>
                    <th>User Display Name</th>
                    <th>Email</th>
                    <th>Issue Title</th>
                    <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.issues.map(eachIssue => 
                        <tr>
                            <td> {eachIssue.issueid} </td>
                            <td> {eachIssue.priority} </td>
                            <td> {eachIssue.displayname} </td>
                            <td> {eachIssue.email} </td>
                            <td> {eachIssue.title} </td>
                            <td> <a className="a-delete" onClick={() => {this.viewIssueDetail(eachIssue)}}> View </a></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </Container>
        )
    }
}