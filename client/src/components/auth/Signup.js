import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {signupNewUser} from "../api/UserApi";

export default class Signup extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {"name": e.target.name.value,
                   "email":e.target.email.value,
                    "password":e.target.password.value,
                    "roleId": 0}
        signupNewUser(newUser).then(res => {
            this.props.history.push("/login");
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
            <div className="background-landing">
                <Container className="container-signup">
                    <h1 style = {{color:"white"}}> Signup</h1>
                    <form onSubmit={this.onSubmit}>
                        <p style={{color:"yellow"}}>{this.state.errorMessage}</p>
                        <Form.Group controlId="formDisplayname">
                            <Form.Label className="text-signup">Name</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#00000"}}
                                id = "name"
                                type="name" 
                                placeholder="Enter Full Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="text-signup">Email address</Form.Label>
                            <Form.Control 
                                id = "email"
                                type="email" 
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="text-signup">Password</Form.Label>
                            <Form.Control 
                                id = "password"
                                type="password" 
                                placeholder="Password" 
                                required
                            />
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