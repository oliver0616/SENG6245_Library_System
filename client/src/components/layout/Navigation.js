import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import setAuthToken from "../../utils/setAuthToken";

export default class Navigation extends React.Component {

    onLogoutClick = e =>
    {
        e.preventDefault();
        // Remove token from local storage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        window.location.assign(`/login`);
    };
    render(){
        return(
            <Navbar bg= "dark" expand="lg" variant="dark">
            <Navbar.Brand href="/bookshelf">OnlineLibrary</Navbar.Brand>
            <Form inline  className="form-nav">
                <FormControl type="text"/>
            </Form>
            <Button type="submit" style={{marginLeft:"10px"}}>Search</Button>
            <Nav className="ml-auto">
                <Nav.Link className="link-nav" href="/bookshelf">BookShelf</Nav.Link>
                <Nav.Link className="link-nav" href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link className="link-nav" onClick={this.onLogoutClick}>Logout</Nav.Link>
            </Nav>
        </Navbar>
        )
    }
}
