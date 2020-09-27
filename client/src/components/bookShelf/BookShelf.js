import React from 'react';
import {Container, Table, Image} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {getAllBooks} from '../api/BookApi';

export default class BookShelf extends React.Component {

    constructor() {
        super();
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        getAllBooks().then(books => {
            this.setState({
                books: books.data
            })
        });
    }

    render() {
        return (
            <Container>
                <h1> BookShelf</h1>
                <Table responsive>
                <thead>
                    <tr>
                    <th>Book Image</th>
                    <th>Book Name</th>
                    <th>Book author</th>
                    <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map(eachBook =>
                        <tr>
                        <td><Image src={`/img/${eachBook.bookid}.jpg`} style={{maxWidth:"100px",maxHeight:"200px"}} /></td>
                        <td>{eachBook.name}</td>
                        <td>{eachBook.author}</td>
                        <td><Link to={`book/${eachBook.bookid}`}>View</Link></td>
                        </tr>
                    )}
                </tbody>
                </Table>
            </Container>
        )
    }
}