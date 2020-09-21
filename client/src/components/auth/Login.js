import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {loginUser} from "../api/UserApi";

export default class Login extends React.Component {

    componentDidMount() {
        console.log(this.props)
    }

    onSubmit = e => {
        e.preventDefault();
        const currentUser = {"email":e.target.email.value,
                       "password":e.target.password.value}
        loginUser(currentUser);
    }

    render() {
        return(
            <div className="background-landing">
                <Container className="container-login">
                    <h1 style = {{color:"white"}}> Login</h1>
                    <form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="text-login">Email address</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "email"
                                type="email" 
                                placeholder="Enter email" 
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="text-login">Password</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "password"
                                type="password" 
                                placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <Link to="/signup">Register</Link>
                        </Form.Group>
                        <Button size="lg" variant="light" type="submit">
                            Submit
                        </Button>
                    </form>
                </Container>
            </div>
        )
    }
}