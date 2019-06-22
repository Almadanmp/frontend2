import React, {Component} from 'react';
import EnergyGridCreator from "./US130/EnergyGridCreator";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  CardHeader, Alert,
} from 'reactstrap';

class US130 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Create a new house
          grid.</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardHeader>
              <strong>Create a new Grid</strong>
            </CardHeader>
              <CardBody>
              <EnergyGridCreator/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default US130;
