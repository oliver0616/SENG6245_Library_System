import React from 'react';
import download from 'downloadjs';
import {Container, Image, Row, Col, Button, Form, Card} from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

import {getBookDetail, checkLikeBook, likeBook, removeLikeBook, addDownloadRecord, addUpdateViewHistory, 
    submitComment, getBookCommentById, deleteCommentById} from "../api/BookApi";

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
            loading: true,
            comments:[],
            loadingComment: true
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
        getBookCommentById({"bookId": currentBookId}).then(comments => {
            this.setState({
                comments: comments.data,
                loadingComment: false
            })
        })
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
    
    // This method convert unix timestamp to regular time
    convertTimestamp(unixTime) {
        var dt =new Date(unixTime * 1000);
        var offset = -300;
        var estDate = new Date(dt.getTime() + offset*60*1000);
        return estDate.toString();
    }

    // Delete the comment
    deleteComment(comment) {
        deleteCommentById({commentId: comment.commentid}).then(res => {
            window.location.reload(false);
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const commentData = {
            userId: this.state.userId,
            bookId: this.state.bookId,
            userComment: e.target.userComment.value
        }
        submitComment(commentData).then(res=>{
            window.location.reload(false);
        })
    }

    render() {
        var bookContent;
        var commentSection;

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

        if (this.state.loadingComment) {
            commentSection = (
                <h1> Loading Comments... </h1>
            )
        } else {
            if (this.state.comments.length !== 0)
            {
                commentSection = (
                    <div>
                        {this.state.comments.map(eachComment=> 
                        <Card>
                            <Card.Body>
                            <Card.Title style={{textAlign:"left"}}>{eachComment.displayname}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted" style={{textAlign:"left"}}>{this.convertTimestamp(eachComment.timestamp)}</Card.Subtitle>
                                <Card.Text style={{textAlign:"left"}}>
                                    {eachComment.commenttext}
                                </Card.Text>
                                {this.state.roleId == 1 && <Button style={{float:"right"}} size="sm" onClick={()=>{this.deleteComment(eachComment)}}> Delete </Button>}
                            </Card.Body>
                        </Card>
                        )}
                    </div>
                )
            } else {
                commentSection = (
                    <h1> No Comments </h1>
                )
            }   
        }

        return(
            <Container className="container-book">
                {bookContent}
                <div style={{marginTop:"80px"}}>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>Leave a comment</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                id = "userComment"
                            />
                        </Form.Group>
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                    <hr />
                    {commentSection}
                    <div style={{marginBottom:"100px"}}> </div>
                </div>
            </Container>
            
        )
    }
}

/* ==============================================================================================================================
Links: 
    download file: https://stackoverflow.com/questions/56313787/reactjs-download-file-from-express-server
    refelct css base on state: https://stackoverflow.com/questions/59457439/how-to-change-a-css-property-based-on-a-state-of-another-component
*/