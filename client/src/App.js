import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Test from "./components/test/Test";


// Check for token to keep user logged in
if (localStorage.jwtToken)
{
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if(decoded.exp < currentTime)
  {
    // Logout user
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component
{
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App" style ={{backgroundColor: '#ffffff', display :'flex', flexDirection: 'column',height:"auto",minHeight:"100vh"}}>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>

          <Footer />
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
