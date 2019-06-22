import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, CardHeader, Col} from 'reactstrap';
import US001Redux from "./US001/US001Redux";

class US001 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: true};
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Add a Type of
          Geographic Area</Button>
        <Collapse isOpen={this.state.collapse}>
          <Col xs="12" lg="4">
          <Card style={{size: 10}} >
            <CardHeader>
              <strong> Create a new Type </strong>
            </CardHeader>
            <CardBody>
              <US001Redux/>
            </CardBody>
          </Card>
          </Col>
        </Collapse>
      </div>
    );
  }

}

export default US001;
