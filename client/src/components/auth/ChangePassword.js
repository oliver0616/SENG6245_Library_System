import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import jwt_decode from "jwt-decode";

import {changePassword} from "../api/UserApi";

export default class ChangePassword extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: 0,
            warningMessage: ""
        }
    }

    componentDidMount() {
        //get token and decrypt
        const t = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(t);
        const currentUserId = decoded.userid;
        this.setState({
            userId: currentUserId
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.comfirmPassword.value;

        if (password !== confirmPassword) {
            this.setState({
                warningMessage: "Password does not match, please check both password and comfirm password fields"
            });
        } else {
            const passwordData = {
                userId: this.state.userId,
                newPassword: password
            }
            changePassword(passwordData).then(res=> {
            }).then(res => {
                this.props.history.push("/dashboard");
            }).catch(res => {
                this.setState({
                    warningMessage: "something went wrong please try again"
                })
            });
        }
    }

    render() {
        return(
            <Container className="container-login">
                    <h1 style={{margin:"25px"}}>Change Password</h1>
                    <form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <p style={{color:"red"}}> {this.state.warningMessage} </p>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "password"
                                type="password" 
                                placeholder="Enter New Password" 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "comfirmPassword"
                                type="password" 
                                placeholder="Confirm New Password" />
                        </Form.Group>
                        <Button size="lg" type="submit">
                            Submit
                        </Button>
                    </form>
                </Container>
        )
    }
}
