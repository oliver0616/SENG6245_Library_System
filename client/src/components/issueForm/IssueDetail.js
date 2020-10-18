import React from 'react';
import {Container, Row, Button, Modal} from 'react-bootstrap';

import {solvedIssue} from "../api/IssueApi";

export default class IssueDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            issue: {},
            showWarning: false
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.issueDetail);
        if (this.props.location.state.issueDetail !== undefined) {
            this.setState({
                issue: this.props.location.state.issueDetail
            })
        } else {
            this.props.history.push("/allissues");
        }
    }

    solveIssue = e => {
        solvedIssue({issueId: this.state.issue.issueid}).then(res => {
            this.setState({
                showWarning: false
            })
            this.props.history.push("/allissues");
        })
    }

    // This method open delete account warning model
    handleWarningOpen = e => {
        this.setState({
            showWarning:true
        })
    }

    // This method close delete account warning model
    handleWarningClose = e => {
        this.setState({
            showWarning:false
        })
    }

    render() {
        return(
            <Container className="container-allUser">
                <Row>
                    <h1 className="div-issueField"> Issue Form </h1>
                </Row>
                <div className ="div-issueField" style={{marginTop:"25px"}}>
                    <Row>
                        <p className="p-issueField"> IssueForm Id:&nbsp; </p>
                        <p> {this.state.issue.issueid} </p>
                    </Row>
                    <Row>
                        <p className="p-issueField"> Issue title:&nbsp; </p>
                        <p> {this.state.issue.title} </p>
                    </Row>
                    <Row>
                        <p className="p-issueField"> Submitted User Name:&nbsp; </p>
                        <p> {this.state.issue.displayname} </p>
                    </Row>
                    <Row>
                        <p className="p-issueField"> User Email:&nbsp; </p>
                        <p> {this.state.issue.email} </p>
                    </Row>
                    <Row>
                        <p className="p-issueField"> Priority:&nbsp; </p>
                        <p> {this.state.issue.priority} </p>
                    </Row>
                    <Row>
                        <p className="p-issueField"> Description:&nbsp; </p>
                        <p> {this.state.issue.description} </p>
                    </Row>
                    <Row>
                        <Button className="button-solveIssue" size="lg" onClick={this.handleWarningOpen}> Solved </Button>
                    </Row>
                </div>
                <Modal show={this.state.showWarning} onHide={this.handleWarningClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Has the issue been resolved?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleWarningClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={this.solveIssue}>
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}