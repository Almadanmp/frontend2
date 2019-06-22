import React, {Component} from 'react';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";

class UnderMaintenance extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-start">
            <Col md="8">
              <span className="clearfix">
                <h4 className="pt-12">Houston, we have a problem!</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
                <img src="https://imgur.com/JJeNR0F.png" width="600" height="400"/>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UnderMaintenance;

