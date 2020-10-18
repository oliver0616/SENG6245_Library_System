import React from 'react';
import {Container, Table, Image, Tabs, Tab, Button, Row, Col, Modal} from 'react-bootstrap';
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import {getViewHistory, getLikeHistory, getDownloadHistory} from "../api/BookApi";
import {deleteAccount} from "../api/UserApi";

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
            loadingDownloadHistory: true,
            showDeleteWarning: false,
            userId: null,
            roleId: null
        };
    }

    componentDidMount() {
        //get token and decrypt
        const t = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(t);
        const currentUserId = decoded.userid;
        const currentRoleId = decoded.role;
        this.setState({
            userId: currentUserId,
            roleId: currentRoleId
        })
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

    // This method direct to change password page
    changePassword = e => {
        this.props.history.push("/changepassword");
    }

    // This method delete the current account
    deleteAccount = e => {
        deleteAccount({userId: this.state.userId}).then(res => {
            // Remove token from local storage
            localStorage.removeItem("jwtToken");
            // Remove auth header for future requests
            setAuthToken(false);
            window.location.assign(`/login`);
        })
    }

    // This method redirect page to submit issue
    submitIssue = e => {
        this.props.history.push("/issueform");
    }

    // This method open delete account warning model
    handleWarningOpen = e => {
        this.setState({
            showDeleteWarning:true
        })
    }

    // This method close delete account warning model
    handleWarningClose = e => {
        this.setState({
            showDeleteWarning:false
        })
    }

    // This method go to addBook page
    addBook = e => {
        this.props.history.push("/addbook");
    }

    // This method go to signuplibrarian page
    signupNewLibrarian = e => {
        this.props.history.push("/signuplibrarian");
    }

    // This method redirect the page to AllUser
    listAllUser = e => {
        this.props.history.push("/alluser");
    }

    // This method reidrect the page to AllIssues
    listAllIssues = e => {
        this.props.history.push("/allissues");
    }

    
    render() {
        var viewHistory;
        var likedHistory;
        var downloadHistory;
        var librarianSetting;

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

        if (this.state.roleId == 1) {
            librarianSetting = (
                <div>
                    <Row>
                        <Button size="lg" className="button-userSetting" onClick={this.addBook}> Add Book </Button>
                    </Row>
                    <Row>
                        <Button size="lg" className="button-userSetting" onClick={this.signupNewLibrarian}> Add New Librarian </Button>
                    </Row>
                    <Row>
                        <Button size="lg" className="button-userSetting" onClick={this.listAllUser}> Check All Users </Button>
                    </Row>
                    <Row>
                        <Button size="lg" className="button-userSetting" onClick={this.listAllIssues}> Check Issue Forms </Button>
                    </Row>
                </div>
            )
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
                    <Tab eventKey="userSetting" title="Setting">
                        <Container className="container-userSetting">
                            <Col>
                                <Row>
                                    <Button size="lg" className="button-userSetting" onClick={this.changePassword}> Change Password </Button>
                                </Row>
                                <Row>
                                    {this.state.userId!=="0"&&<Button size="lg" className="button-userSetting" onClick={this.handleWarningOpen}> Delete Account </Button>}
                                </Row>
                                <Row>
                                    <Button size="lg" className="button-userSetting" onClick={this.submitIssue}> Submit Issue </Button>
                                </Row>
                                {librarianSetting}
                            </Col>
                        </Container>
                        <Modal show={this.state.showDeleteWarning} onHide={this.handleWarningClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>You are about to delete your account!!! Are you sure you want to do this?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleWarningClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={this.deleteAccount}>
                                Yes
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}