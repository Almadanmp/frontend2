import React, {Component} from 'react';
import AreaSensorRemover from "./US011/AreaSensorRemover"
import {
  Collapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';

class US011 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}> Remove a sensor from area</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <AreaSensorRemover/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default US011;
