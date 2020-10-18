import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import jwt_decode from "jwt-decode";

import {submitIssue} from "../api/IssueApi";

export default class IssueForm extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: null
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

        const IssueForm = {
            "title": e.target.title.value,
            "priority": e.target.priority.value,
            "description": e.target.description.value,
            "userId": this.state.userId
        };
        
        submitIssue(IssueForm).then(res=> {
            this.props.history.push("/dashboard");
        }).catch(err=> {console.log(err)})
    }

    render() {
        return (
            <Container className="container-addBook">
                <h1 style={{margin:"25px"}}>Issue Form</h1>
                <form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "title"
                            type="text" 
                            placeholder="Enter Short Description of the Issue" 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Priority (with 1 is the highest, 5 is the lowest)</Form.Label>
                        <Form.Control 
                            as="select"
                            id = "priority"
                        >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3" 
                            id = "description"
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