import React from 'react';
import {Container, Table, Image} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class Book extends React.Component {

    componentDidMount() {
        const currentBookId = this.props.match.params.id;
        // Load detail info relate to this book
        // Load comments relate to this book
        // optional: load rating
    }

    render() {
        return(
            <h1> this is book page </h1>
        )
    }
}