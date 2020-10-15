import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';

import {signupNewUser} from "../api/UserApi";

export default class SignupLibrarian extends React.Component {

    onSubmit = e => {
        e.preventDefault();
        const newLibrarian = {"name": e.target.name.value,
                    "email":e.target.email.value,
                    "password":e.target.password.value,
                    "roleId": 1}
        signupNewUser(newLibrarian);
        this.props.history.push("/dashboard");
    }

    render() {
        return(
            <Container className="container-signup">
                <h1> Add new Librarian</h1>
                <form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formDisplayname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#00000"}}
                            id = "name"
                            type="name" 
                            placeholder="Enter Full Name" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            id = "email"
                            type="email" 
                            placeholder="Enter email" 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            id = "password"
                            type="password" 
                            placeholder="Password" />
                    </Form.Group>
                    <Button size="lg" variant="light" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        )
    }
}