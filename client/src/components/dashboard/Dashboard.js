import React from 'react';
import {Container, Table, Image, Tabs, Tab} from 'react-bootstrap';
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import {getViewHistory, getLikeHistory, getDownloadHistory} from "../api/BookApi";

export default class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            currentTabKey:"viewHistory",
            viewHistory: [],
            loadingViewHistory: true,
            likedHistory: [],
            loadingLikedHistory: true,
            downloadHistory: [],
            loadingDownloadHistory: true
        };
    }

    componentDidMount() {
        //get token and decrypt
        const t = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(t);
        const currentUserId = decoded.userid;
        // Fetch view history
        getViewHistory({"userId": currentUserId}).then(viewHistory => {
            this.setState({
                userName: decoded.name,
                viewHistory: viewHistory.data,
                loadingViewHistory: false
            })
        });
        // Fetch liked history
        getLikeHistory({"userId": currentUserId}).then(likedHistory => {
            this.setState({
                likedHistory: likedHistory.data,
                loadingLikedHistory: false
            })
        });
        // Fetch download history
        getDownloadHistory({"userId": currentUserId}).then(downloadHistory => {
            this.setState({
                downloadHistory: downloadHistory.data,
                loadingDownloadHistory: false
            })
        });
    }


    // This method change the key of the selected tab
    setTabKey(selectedKey) {
        this.setState({
            currentTabKey:selectedKey
        })
    }

    // This method convert unix timestamp to regular time
    convertTimestamp(unixTime) {
        var dt =new Date(unixTime * 1000);
        var offset = -300;
        var estDate = new Date(dt.getTime() + offset*60*1000);
        return estDate.toString();
    }

    
    render() {
        var viewHistory;
        var likedHistory;
        var downloadHistory;

        if (this.state.loadingViewHistory) {
            viewHistory = (
                <h1> Loading View History </h1>
            )
        } else {
            // All view history are loaded
            if (this.state.viewHistory.length !== 0){
                viewHistory = (
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>View Time</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.viewHistory.map(eachBook =>
                                <tr>
                                <td><Image src={`/img/${eachBook.bookid}.jpg`} style={{maxWidth:"100px",maxHeight:"200px"}} /></td>
                                <td>{eachBook.name}</td>
                                <td>{this.convertTimestamp(eachBook.timestamp)}</td>
                                <td><Link to={`book/${eachBook.bookid}`}>View</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )
            } else {
                viewHistory = (
                    <h1> No View History </h1>
                )
            }
        }

        if (this.state.loadingLikedHistory) {
            likedHistory = (
                <h1> Loading Liked History </h1>
            )
        } else {
            if (this.state.likedHistory.length !== 0) {
                likedHistory = (
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>Liked Time</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.likedHistory.map(eachBook =>
                                <tr>
                                <td><Image src={`/img/${eachBook.bookid}.jpg`} style={{maxWidth:"100px",maxHeight:"200px"}} /></td>
                                <td>{eachBook.name}</td>
                                <td>{this.convertTimestamp(eachBook.timestamp)}</td>
                                <td><Link to={`book/${eachBook.bookid}`}>View</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )
            } else {
                likedHistory = (
                    <h1> No Liked History </h1>
                )
            }
        }

        if (this.state.loadingDownloadHistory) {
            downloadHistory = (
                <h1> Loading Download History </h1>
            )
        } else {
            if (this.state.downloadHistory.length !== 0) {
                downloadHistory = (
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>Downloaded Time</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.downloadHistory.map(eachBook =>
                                <tr>
                                <td><Image src={`/img/${eachBook.bookid}.jpg`} style={{maxWidth:"100px",maxHeight:"200px"}} /></td>
                                <td>{eachBook.name}</td>
                                <td>{this.convertTimestamp(eachBook.timestamp)}</td>
                                <td><Link to={`book/${eachBook.bookid}`}>View</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )
            } else {
                downloadHistory = (
                    <h1> No Download History </h1>
                )
            }
        }

        return (
            <Container>
                <h1> Hi {this.state.userName} </h1>
                <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={(selectedKey) => this.setTabKey(selectedKey)}
                >
                    <Tab eventKey="viewHistory" title="View History">
                        {viewHistory}
                    </Tab>
                    <Tab eventKey="likedHistory" title="Liked History">
                        {likedHistory}
                    </Tab>
                    <Tab eventKey="downloadHistory" title="Download History">
                        {downloadHistory}
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}