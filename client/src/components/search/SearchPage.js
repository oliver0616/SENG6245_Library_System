import React from 'react';
import { Container, Button, Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {simpleSearch} from "../api/SearchApi";

export default class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            bookResult: [],
            loadingSearchResult: true
        };
    }

    componentDidMount() {
        const searchText = this.props.location.state.searchText

        if (searchText !== ""){
            simpleSearch({searchText:searchText}).then(res => {
                this.setState({
                    searchText: searchText,
                    bookResult: res.data,
                    loadingSearchResult: false
                })
            })
        } 
    }

    render() {
        var resultSection;
        console.log(this.state.bookResult);
        if (this.state.loadingSearchResult) {
            resultSection = (
                <h1> Searching ...</h1>
            )
        } else {
            resultSection = (
                this.state.bookResult.map(eachBook =>
                    <Row style={{margin:"10px"}}>
                        <Col sm={2}>
                            <Image src={`/img/${eachBook.bookid}.jpg`} style={{maxWidth:"150px",maxHeight:"250px"}}/>
                        </Col>
                        <Col sm={10}>
                            <Card style={{display: 'flex', flexDirection: 'row'}}>
                                <Card.Body>
                                    <Card.Title>{eachBook.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{eachBook.author}</Card.Subtitle>
                                    <Card.Text>
                                        <p> Description: {eachBook.description} </p>
                                        <p> keywords: {eachBook.keywords} </p>
                                    </Card.Text>
                                    <Link to={`book/${eachBook.bookid}`}>View</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            )
        }
        // <Card.Img variant="bottom" src={`/img/0.jpg`} />
        return (
            <Container className="conatiner-searchResult">
                {resultSection}
            </Container>
        )
    }
}