import React from 'react';
import {Container, Table, Image, Tabs, Tab, Button, Row, Col, Modal} from 'react-bootstrap';

import {listAllUser, deleteAccount} from "../api/UserApi";

export default class AllUser extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            showDeleteWarning: false,
            currentDeleteUserId: null
        }
    }

    componentDidMount() {
        listAllUser().then(users=> {
            this.setState({
                users: users.data
            })
        })
    }

    deleteUser = e => {
        if (this.state.currentDeleteUserId !== "0") {
            deleteAccount({userId: this.state.currentDeleteUserId}).then(res => {
                console.log(res.data);
            })
        }
        this.setState({
            showDeleteWarning:false,
            currentDeleteUserId: null
        })
        window.location.reload(false);
    }

    // This method open delete account warning model
    handleWarningOpen(userData) {
        this.setState({
            showDeleteWarning:true,
            currentDeleteUserId: userData.userid
        })
    }

    // This method close delete account warning model
    handleWarningClose = e => {
        this.setState({
            showDeleteWarning:false
        })
    }

    render() {
        return(
            <Container className = "container-allUser">
            <h1> All Users </h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Display Name</th>
                    <th>Role</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(eachUser => 
                        <tr>
                            <td> {eachUser.userid} </td>
                            <td> {eachUser.email} </td>
                            <td> {eachUser.displayname} </td>
                            <td> {eachUser.rolename} </td>
                            <td> <a className="a-delete" onClick={() => {this.handleWarningOpen(eachUser)}}> Delete </a></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={this.state.showDeleteWarning} onHide={this.handleWarningClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete this user!!! Are you sure you want to do this?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleWarningClose}>
                    No
                </Button>
                <Button variant="primary" onClick={this.deleteUser}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
            </Container>
        )
    }
}