import React, {Component} from 'react';
import {
  Collapse,
  Button,
  CardBody,
  Card,
  CardHeader, ListGroup, Alert,
} from 'reactstrap';
import US108Redux from "./US108/US108Redux.js";

class US108 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
      return (
        <div>
          <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Get a list of existing
            rooms.</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <p><US108Redux/></p>
              </CardBody>
            </Card>
          </Collapse>
        </div>)

    }
}

export default US108;
