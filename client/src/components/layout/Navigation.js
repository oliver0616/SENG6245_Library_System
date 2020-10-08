import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import setAuthToken from "../../utils/setAuthToken";

class Navigation extends React.Component {

    onLogoutClick = e =>
    {
        e.preventDefault();
        // Remove token from local storage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        window.location.assign(`/login`);
    };

    onSubmit = e => {
        e.preventDefault();
        // console.log(e.target.searchText.value);
        this.props.history.push({
            pathname:"/searchPage",
            state: { searchText: e.target.searchText.value }
        });
        window.location.reload(false);
    }

    render(){
        return(
            <Navbar bg= "dark" expand="lg" variant="dark">
            <Navbar.Brand href="/bookshelf">OnlineLibrary</Navbar.Brand>
            <Form inline onSubmit={this.onSubmit}>
                <Form.Group controlId="formSearchBook">
                    <Form.Control 
                        type="text"
                        id = "searchText"
                        placeholder="Search Book..."
                    />
                </Form.Group>
                <Button type="submit" style={{marginLeft:"10px"}}> Search </Button>
            </Form>
            
            <Nav className="ml-auto">
                <Nav.Link className="link-nav" href="/bookshelf">BookShelf</Nav.Link>
                <Nav.Link className="link-nav" href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link className="link-nav" onClick={this.onLogoutClick}>Logout</Nav.Link>
            </Nav>
        </Navbar>
        )
    }
}

export default withRouter(Navigation)