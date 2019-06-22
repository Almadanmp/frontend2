import React, {Component} from 'react';
import AreaSensorInactivation from "./US010/AreaSensorInactivation"
import {
  Collapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';

class US010 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}> Deactivate a sensor from area</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <AreaSensorInactivation/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default US010;
