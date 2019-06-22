import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import US002Redux from "./US002/US002Redux";

class US002 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Get geographic area types</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <US002Redux/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }

}

export default US002;
