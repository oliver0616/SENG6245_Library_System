import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import {testConnection} from "../api/Test"

export default class Test extends React.Component {

  componentDidMount() {
    testConnection("Hey here kasdkfajkds");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Hey this is test message here</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}