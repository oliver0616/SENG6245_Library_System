import React from 'react';
import { Button, Container} from 'react-bootstrap';

export default class Landing extends React.Component {

  render() {
    return (
      <div className="background-landing">
        <Container className="container-landing">
            <h1 style = {{color:"white"}}> Welcome to Online Library</h1>
                <div className="button-container-landing">
                    <Button href="./login" size="lg" variant="light">Login</Button>
                    <hr/> <hr/> <hr/>
                    <Button href="./signup" size="lg" variant="light">Register</Button>
                </div>
        </Container>
      </div>
    );
  }
}