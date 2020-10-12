import React from 'react';
import { Button, Container, Form} from 'react-bootstrap';

import {addNewBook, uploadBookCover, uploadBookPdf} from '../api/BookApi';

export default class AddBook extends React.Component {

    constructor() {
        super();
        this.state = {
            warningMessage: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();
        // console.log(e.target.bookCover.files[0]);
        // console.log(e.target.pdfFile.files[0]);
        // const bookData = {
        //     bookName: e.target.bookName.value,
        //     authorName: e.target.authorName.value,
        //     keywords: e.target.keywords.value,
        //     description: e.target.description.value,
        //     coverImage: e.target.bookCover.files[0],
        //     pdfFile: e.target.pdfFile.files[0]
        // }
        // console.log(bookData);
        // addNewBook(bookData).then(res=> {
        //     console.log(res);
        // })


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
                    <form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <p style={{color:"red"}}> {this.state.warningMessage} </p>
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "bookName"
                                type="text" 
                                placeholder="Enter Book Name" 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "authorName"
                                type="text" 
                                placeholder="Enter Author Name" 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Keywords (Seperate keywords using comma)</Form.Label>
                            <Form.Control 
                                style = {{backgroundColor:"	#FFFFFF"}}
                                id = "keywords"
                                type="text" 
                                placeholder="Ex. Apple, Banana, Child" 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                id = "description"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="bookCover" label="Upload Book Cover" />
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="pdfFile" label="Upload Book PDF" />
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