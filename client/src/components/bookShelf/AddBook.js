import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';

import {addNewBook, uploadBookCover, uploadBookPdf} from '../api/BookApi';
import { store } from 'react-notifications-component';

export default class AddBook extends React.Component {

    constructor() {
        super();
        this.state = {
            warningMessage: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        const bookCoverFormData = new FormData();
        const bookPdfFormData = new FormData();
        formData.append("bookName", e.target.bookName.value);
        formData.append("authorName", e.target.authorName.value);
        formData.append("keywords", e.target.keywords.value);
        formData.append("description", e.target.description.value);
        bookCoverFormData.append("bookCover", e.target.bookCover.files[0]); 
        bookPdfFormData.append("pdfFile", e.target.pdfFile.files[0]); 
        addNewBook(formData).then(res=>{
            bookCoverFormData.append("bookId", res.data.currentBookId);
            bookPdfFormData.append("bookId", res.data.currentBookId);
            uploadBookCover(bookCoverFormData);
            uploadBookPdf(bookPdfFormData);
            store.addNotification({
                title: "Success!",
                message: "Added Book",
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
            document.getElementById("addBookForm").reset();
        });
        // Print out items in formData
        //   for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
    }

    render() {
        return(
            <Container className="container-addBook">
                <h1 style={{margin:"25px"}}>Add New Book</h1>
                <form onSubmit={this.onSubmit} id="addBookForm">
                    <Form.Group>
                        <p style={{color:"red"}}> {this.state.warningMessage} </p>
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "bookName"
                            type="text" 
                            placeholder="Enter Book Name"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "authorName"
                            type="text" 
                            placeholder="Enter Author Name" 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Keywords (Seperate keywords using comma)</Form.Label>
                        <Form.Control 
                            style = {{backgroundColor:"	#FFFFFF"}}
                            id = "keywords"
                            type="text" 
                            placeholder="Ex. Apple, Banana, Child" 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3" 
                            id = "description"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="bookCover" label="Upload Book Cover" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="pdfFile" label="Upload Book PDF" required/>
                    </Form.Group>
                    <Button size="lg" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        )
    }
}

// Example upload data: https://www.geeksforgeeks.org/file-uploading-in-react-js/
// https://medium.com/@minatibiswal/how-to-upload-files-in-react-with-nodejs-express-3a3dafc1b285
// https://attacomsian.com/blog/uploading-files-nodejs-express