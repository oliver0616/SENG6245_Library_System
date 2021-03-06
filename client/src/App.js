import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import PrivateRoute from "./components/common/PrivateRoute";
import LibrarianRoute from "./components/common/LibrarianRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import SignupLibrarian from "./components/auth/SignupLibrarian";
import ChangePassword from "./components/auth/ChangePassword";
import Landing from "./components/layout/Landing";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Book from "./components/bookShelf/Book";
import BookShelf from "./components/bookShelf/BookShelf";
import EditBook from "./components/bookShelf/EditBook";
import AddBook from "./components/bookShelf/AddBook";
import Dashboard from "./components/dashboard/Dashboard";
import AllUser from "./components/dashboard/AllUser";
import SearchPage from "./components/search/SearchPage";
import IssueForm from "./components/issueForm/IssueForm";
import AllIssues from "./components/dashboard/AllIssues";
import IssueDetail from "./components/issueForm/IssueDetail";


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
    const LibrarianAccess = () => (
      <div>
        <LibrarianRoute exact path="/editbook/:id" component={EditBook} />
        <LibrarianRoute exact path="/addbook" component={AddBook} />
        <LibrarianRoute exact path="/alluser" component={AllUser} />
        <LibrarianRoute exact path="/signuplibrarian" component={SignupLibrarian} />
        <LibrarianRoute exact path="/allissues" component={AllIssues} />
        <LibrarianRoute exact path="/issuedetail/:id" component={IssueDetail} />
      </div>
    )

    const withNavBar = () => (
      <div>
        <ReactNotification />
        <Navigation />
        <PrivateRoute exact path="/bookshelf" component={BookShelf} />
        <PrivateRoute exact path="/book/:id" component={Book} />
        <PrivateRoute exact path="/editbook/:id" component={LibrarianAccess} />
        <PrivateRoute exact path="/addbook" component={LibrarianAccess} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/alluser" component={LibrarianAccess} />
        <PrivateRoute exact path="/searchpage" component={SearchPage} />
        <PrivateRoute exact path="/changepassword" component={ChangePassword} />
        <PrivateRoute exact path="/signuplibrarian" component={LibrarianAccess} />
        <PrivateRoute exact path="/issueform" component={IssueForm} />
        <PrivateRoute exact path="/allissues" component={LibrarianAccess} />
        <PrivateRoute exact path="/issuedetail/:id" component={LibrarianAccess} />
      </div>
    )
    
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App" style ={{backgroundColor: '#ffffff', display :'flex', flexDirection: 'column',height:"auto",minHeight:"100vh"}}>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signuplibrarian" component={withNavBar}/>
          <Route exact path="/changepassword" component={withNavBar}/>
          <Route exact path="/bookshelf" component={withNavBar}/>
          <Route exact path="/book/:id" component={withNavBar}/>
          <Route exact path="/editbook/:id" component={withNavBar}/>
          <Route exact path="/addbook" component={withNavBar}/>
          <Route exact path="/dashboard" component={withNavBar}/>
          <Route exact path="/alluser"component={withNavBar}/>
          <Route exact path="/searchpage" component={withNavBar}/>
          <Route exact path="/issueform" component={withNavBar}/>
          <Route exact path="/allissues" component={withNavBar}/>
          <Route exact path="/issuedetail/:id" component={withNavBar}/>
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
