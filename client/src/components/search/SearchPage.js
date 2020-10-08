import React from 'react';
import { Container, Card, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {simpleSearch, detailSearch} from "../api/SearchApi";

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
        } else {
            this.setState({
                loadingSearchResult: false
            })
        }
    }

    submitSearch = e =>  {
        e.preventDefault();
        const searchText = e.target.searchText.value
        const searchData = {
            searchText: searchText,
            bookNameOption: e.target.bookName.checked,
            authorNameOption: e.target.authorName.checked,
            keywordOption: e.target.keyword.checked
        }

        detailSearch(searchData).then(res => {
            this.setState({
                searchText: searchText,
                bookResult: res.data,
                loadingSearchResult: false
            })
        })
    }

    render() {
        var resultSection;
        
        if (this.state.loadingSearchResult) {
            resultSection = (
                <h1> Searching ...</h1>
            )
        } else {
            // Found results
            if (this.state.bookResult.length !== 0){
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
            // No results
            else{ 
             resultSection = (
                 <h1> No Results </h1>
             )
            }
        }
        // <Card.Img variant="bottom" src={`/img/0.jpg`} />
        return (
            <Container className="conatiner-searchResult">
                <div className="div-searchBox">
                    <form onSubmit={this.submitSearch}>
                                <Form.Group style={{margin:"5px"}}>
                                    <Form.Control 
                                        style = {{backgroundColor:"	#FFFFFF"}}
                                        id = "searchText"
                                        type="text" 
                                        placeholder="Search..." 
                                    />
                                </Form.Group>
                                <Button size="lg" type="submit">
                                    Search
                                </Button>
                                <Row style={{margin:"5px"}}>
                                    <Form.Check 
                                        style = {{margin:"5px"}}
                                        type="checkbox"
                                        id="bookName"
                                        label="Book Name"
                                    />
                                    <Form.Check 
                                        style = {{margin:"5px"}}
                                        type="checkbox"
                                        id="authorName"
                                        label="Author Name"
                                    />
                                    <Form.Check 
                                        style = {{margin:"5px"}}
                                        type="checkbox"
                                        id="keyword"
                                        label="Keywords" 
                                    />
                                </Row>
                    </form>
                    </div>
                <br />
                {resultSection}
            </Container>
        )
    }
}