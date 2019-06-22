import React, {Component} from 'react';
import {logInUser} from './sessionActions';
import {Col, Container, Row} from "reactstrap";

export class FirstPage extends Component {
  constructor(props) {
    super(props);
  }

  routeChange() {
    this.props.history.replace('/');
  }

  render() {
    return (
      <>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-start">
              <Col md="8">
              <span className="clearfix">
        <form>

          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.routeChange}/>
          {" "}
        </form>
                </span>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default FirstPage;
