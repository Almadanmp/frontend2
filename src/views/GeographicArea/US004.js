import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import US004Redux from "./US004/US004Redux";

class US004 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Get geographic area by type</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <US004Redux/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }

}

export default US004;
