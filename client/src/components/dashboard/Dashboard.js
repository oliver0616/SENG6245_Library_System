import React from 'react';
import {Container, Table, Image, Tabs, Tab} from 'react-bootstrap';
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import {getViewHistory} from "../api/BookApi";

export default class Dashboard extends React.Component {
    constructor() {
        super();
        this.state={
            currentTabKey:"viewHistory"
        };
    }

    componentDidMount() {
        //get token and decrypt
        const t = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(t);
        const currentUserId = decoded.userid;
        // Fetch view history
        getViewHistory({"userId": currentUserId})
        // Fetch liked history
        // Fetch download history
    }

    // This method change the key of the selected tab
    setTabKey(selectedKey) {
        this.setState({
            currentTabKey:selectedKey
        })
    }

    
    render() {
        return (
            <Container>
                <h1> this is dashboard page </h1>
                <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={(selectedKey) => this.setTabKey(selectedKey)}
                >
                    <Tab eventKey="viewHistory" title="View History">
                        <p> test1 </p>
                    </Tab>
                    <Tab eventKey="likedHistory" title="Liked History">
                        <p> test2 </p>
                    </Tab>
                    <Tab eventKey="downloadHistory" title="Download History">
                        <p> test3 </p>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}