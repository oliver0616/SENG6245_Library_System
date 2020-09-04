import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

import Test from "./components/test/Test";

class App extends Component
{
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Test}/>
        </div>
      </Router>
    )
  }
}

export default App;
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
