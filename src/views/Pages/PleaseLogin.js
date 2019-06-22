import React, {Component} from 'react';
import {Button, Col, Container, Row} from "reactstrap";

class PleaseLogin extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {collapse: false};
  }

  onClick() {
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div align="center">
        <Container>
          <Row className="justify-content-start">
            <Col md="8">
              <span className="clearfix">
                <h4 className="pt-12">You Shall Not Pass!</h4>
                <p className="text-muted float-left">Please log in to access this page.</p>

                <img src="https://i.imgur.com/qVPAMy3.png" width="600" height="400"/>
                <p></p>
                <p></p>
                <Button onClick={this.onClick} style={{backgroundColor: '#93c4c4', marginBottom: '10rem'}}
                        class="fa fa-plus-square-o fa-lg mt-4">LOGIN</Button>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PleaseLogin;

