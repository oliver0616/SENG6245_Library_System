import React from 'react';
import download from 'downloadjs';
import {Container, Image, Row, Col, Button} from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

import {getBookDetail, checkLikeBook, likeBook, removeLikeBook, addDownloadRecord, addUpdateViewHistory} from "../api/BookApi";

export default class Book extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: "",
            roleId: null,
            bookId: "",
            book: {},
            like: false,
            likeText: "like",
            loading: true
        };
    }

    componentDidMount() {
        const currentBookId = this.props.match.params.id;
        //get token and decrypt
        const t = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(t);
        const currentUserId = decoded.userid;
        const currentRoleId = decoded.role;

        // Get the detail of current book
        getBookDetail({"bookId":currentBookId}).then(book => {
            var date = new Date(book.data[0].timestamp * 1000);
            var currentBook = book.data[0];
            currentBook.timestamp = date

            this.setState({
                userId: currentUserId,
                roleId: currentRoleId,
                bookId: currentBookId,
                book: currentBook,
                loading: false
            });
        }).catch(err => {
            console.log(err);
        });

        // Check if book is liked or not
        checkLikeBook({
            "userId": currentUserId,
            "bookId": currentBookId
        }).then(like => {
            if(like.data.liked) {
                this.setState({
                    like: true,
                    likeText: "liked"
                })
            } else {
                this.setState({
                    like: false,
                    likeText: "like"
                })
            }
        })
            
        // Add/update view book history
        addUpdateViewHistory({"userId": currentUserId,"bookId": currentBookId})
        // Load comments relate to this book
        // optional: load rating
    }

    // This method download the current book using the browser
    downloadBook = async () => {
        addDownloadRecord({"userId":this.state.userId, "bookId":this.state.bookId})
        const res = await fetch('/api/book/downloadBookById', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/pdf',
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({"bookId": this.state.bookId})
                });
                const blob = await res.blob();
                download(blob, `${this.state.book.name}.pdf`);
    }

    // This method either like the book or remove the like from the book
    likeBook = e => {
        var liked = this.state.like;

        if (liked) {
            removeLikeBook({
                "userId": this.state.userId,
                "bookId": this.state.bookId
            }).then(resData => {
                this.setState({
                    like: false,
                    likeText: "like"
                })
            })
        }
        else {
            likeBook({
                "userId": this.state.userId,
                "bookId": this.state.bookId
            }).then(resData => {
                this.setState({
                    like: true,
                    likeText: "liked"
                })
            })
        }
    }

    render() {
        var bookContent;

        if (this.state.loading == false) {
            bookContent = (
                <div>
                <h1> {this.state.book.name} </h1>
                    {this.state.roleId == 1 && <Link style={{float:"right"}} to= {{pathname:`/editbook/${this.state.bookId}`, book:this.state.book}}> Edit </Link>}
                    <Row style={{marginTop:"50px"}}>
                        <Col>
                            <Image src={`/img/${this.state.bookId}.jpg`} style={{maxWidth:"400px",maxHeight:"600px"}} />
                        </Col>
                        <Col>
                            <Row> 
                                <p className="p-bookInfo-title"> Book Name:&nbsp; </p> 
                                <p> {this.state.book.name} </p>
                            </Row>
                            <Row> 
                                <p className="p-bookInfo-title"> Author Name:&nbsp; </p> 
                                <p> {this.state.book.author} </p>
                            </Row>
                            <Row> 
                                <p className="p-bookInfo-title"> Keywords:&nbsp; </p>
                                {this.state.book.keywords}
                            </Row>
                            <Row> 
                                <p className="p-bookInfo-title"> Description:&nbsp; </p> 
                                {this.state.book.description}
                            </Row>
                            <br />
                            <Row>
                            <p className="p-bookInfo-title"> Upload Time:&nbsp; </p> 
                                {this.state.book.timestamp.toString()}
                            </Row>
                            <Row>
                            <Button
                                    type="button"
                                    onClick={this.likeBook}
                                    style={this.state.like ? {margin:"10px", backgroundColor: "#008000"} : {margin:"10px"}}
                                >
                                {this.state.likeText}
                            </Button>
                            <Button
                                    type="button"
                                    onClick={this.downloadBook}
                                    style={{margin:"10px"}}
                                >
                                Download
                            </Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            bookContent = (
            <h1> Loading Book </h1>
            )
        }

        return(
            <Container className="container-book">
                {bookContent}
            </Container>
            
        )
    }
}

/* ==============================================================================================================================
Links: 
    download file: https://stackoverflow.com/questions/56313787/reactjs-download-file-from-express-server
    refelct css base on state: https://stackoverflow.com/questions/59457439/how-to-change-a-css-property-based-on-a-state-of-another-component
*/