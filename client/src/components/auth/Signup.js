import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {signupNewUser} from "../api/UserApi";

export default class Signup extends React.Component {

    onSubmit = e => {
        e.preventDefault();
        const newUser = {"name": e.target.name.value,
                   "email":e.target.email.value,
                    "password":e.target.password.value}
        signupNewUser(newUser);
        this.props.history.push("/login");
    }

    render() {
        return(
            <div className="background-landing">
                <Container className="container-signup">
                    <h1 style = {{color:"white"}}> Signup</h1>
                    <form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formDisplayname">
                            <Form.Label className="text-signup">Name</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#00000"}}
                                id = "name"
                                type="name" 
                                placeholder="Enter Full Name" 
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="text-signup">Email address</Form.Label>
                            <Form.Control 
                                id = "email"
                                type="email" 
                                placeholder="Enter email" 
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="text-signup">Password</Form.Label>
                            <Form.Control 
                                id = "password"
                                type="password" 
                                placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <Link to="/login">Login</Link>
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