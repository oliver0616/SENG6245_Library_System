import React from 'react';
import { Button, Container, Form, Modal} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {editBook, uploadBookCover, uploadBookPdf, deleteBookById} from "../api/BookApi";
import { store } from 'react-notifications-component';

export default class EditBook extends React.Component {
    constructor() {
        super()
        this.state = {
            book:{},
            refresh: false,
            showDeleteWarning: false
        }
    }
    componentDidMount() {
        if (this.props.location.book == undefined) {
            this.setState({
                refresh: true
            })
        }
        else {
            this.setState({
                book: this.props.location.book
            })
        }
    }

    // This method open delete book warning model
    handleWarningOpen() {
        this.setState({
            showDeleteWarning:true
        })
    }

    // This method close delete book warning model
    handleWarningClose = e => {
        this.setState({
            showDeleteWarning:false
        })
    }


    deleteBook = e => {
        deleteBookById({bookId:this.state.book.bookid}).then(res => {
            this.props.history.push("/bookshelf");
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        const bookCoverFormData = new FormData();
        const bookPdfFormData = new FormData();
        formData.append("bookId", this.state.book.bookid);
        formData.append("bookName", e.target.bookName.value);
        formData.append("authorName", e.target.authorName.value);
        formData.append("keywords", e.target.keywords.value);
        formData.append("description", e.target.description.value);
        var uploadBookCoverFlag = false;
        var uploadBookPdfFlag = false;

        if (e.target.bookCover.files[0] !== undefined) {
            uploadBookCoverFlag = true;
            bookCoverFormData.append("bookCover", e.target.bookCover.files[0]); 
            bookCoverFormData.append("bookId", this.state.book.bookid);
        }
        if (e.target.pdfFile.files[0] !== undefined) {
            uploadBookPdfFlag = true;
            bookPdfFormData.append("pdfFile", e.target.pdfFile.files[0]);
            bookPdfFormData.append("bookId", this.state.book.bookid);
        }
        
        editBook(formData).then(res=>{
            if (uploadBookCoverFlag) {
                uploadBookCover(bookCoverFormData);
            }
            if (uploadBookPdfFlag) {
                uploadBookPdf(bookPdfFormData);
            }
            store.addNotification({
                title: "Success!",
                message: "Edited Book Successfully",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        });
        // Print out items in formData
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
    }

    render() {

        return(
            <Container className="container-addBook">
                <Link to={`/book/${this.state.book.bookid}`} style={{float:"left"}}> Go back to book </Link>
                <br />
                <h1 style={{margin:"25px"}}>Edit Book</h1>
                <form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <p style={{color:"red"}}> {this.state.warningMessage} </p>
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "bookName"
                            type="text" 
                            defaultValue={this.state.book.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "authorName"
                            type="text" 
                            defaultValue={this.state.book.author}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Keywords (Seperate keywords using comma)</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "keywords"
                            type="text" 
                            defaultValue={this.state.book.keywords}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3" 
                            id = "description"
                            defaultValue={this.state.book.description}
                        />
                    </Form.Group>
                    <hr />
                    <p> Use these to replace previous pdf file and book cover </p>
                    <Form.Group>
                        <Form.File id="bookCover" label="Upload Book Cover" />
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="pdfFile" label="Upload Book PDF" />
                    </Form.Group>
                    <Button size="lg" onClick={() => {this.handleWarningOpen()}}>
                        Delete Book
                    </Button>
                    <Button size="lg" type="submit">
                        Submit
                    </Button>
                </form>
                <Modal show={this.state.showDeleteWarning} onHide={this.handleWarningClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are about to delete this book!!! Are you sure you want to do this?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleWarningClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={this.deleteBook}>
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}