import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { store } from 'react-notifications-component';

import {signupNewUser} from "../api/UserApi";

export default class SignupLibrarian extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMessage: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const newLibrarian = {"name": e.target.name.value,
                    "email":e.target.email.value,
                    "password":e.target.password.value,
                    "roleId": 1}
        signupNewUser(newLibrarian).then(res => {
            store.addNotification({
                title: "Success!",
                message: "New Librarian Created",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            document.getElementById("newLibarianForm").reset();
            // this.props.history.push("/dashboard");
        }).catch(err => {
            if(err.response.status == 400) {
                console.log(err.response.data.email);
                this.setState({
                    errorMessage: err.response.data.email
                })
            }
            if(err.response.status == 500) {
                console.log(err.response.data.dbErr);
                this.setState({
                    errorMessage: err.response.data.dbErr
                })
            }
        })
    }

    render() {
        return(
            <Container className="container-signup">
                <h1> Add new Librarian</h1>
                <form onSubmit={this.onSubmit} id="newLibarianForm">
                    <p style={{color:"red"}}>{this.state.errorMessage}</p>
                    <Form.Group controlId="formDisplayname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#00000"}}
                            id = "name"
                            type="name" 
                            placeholder="Enter Full Name" 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            id = "email"
                            type="email" 
                            placeholder="Enter email" 
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            id = "password"
                            type="password" 
                            placeholder="Password" 
                            required
                        />
                    </Form.Group>
                    <Button size="lg" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        )
    }
}