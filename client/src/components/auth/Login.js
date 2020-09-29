import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";

import {loginUser} from "../api/UserApi";

export default class Login extends React.Component {

    onSubmit = e => {
        e.preventDefault();
        const currentUser = {"email":e.target.email.value,
                       "password":e.target.password.value}
        loginUser(currentUser).then(res =>{
            // Save to localStorage
            // Set token to localStorage
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            this.props.history.push("/bookshelf");
            //get token and decrypt
            //const t = localStorage.getItem("jwtToken");
            //const decoded = jwt_decode(t);
            //console.log(decoded);
        }).catch(err =>{
                console.log("login error");
        });
    }

    render() {
        return(
            <div className="background-landing">
                <Container className="container-login">
                    <h1 style = {{color:"white"}}>Login</h1>
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