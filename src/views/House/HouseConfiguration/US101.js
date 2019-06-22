import React, {Component} from 'react';
import SelectHouseGA from './US101/SelectHouseGA';
import {
  Collapse,
  Button, Card, CardBody,
} from 'reactstrap';

class US101 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Configure the house location</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <SelectHouseGA/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}

export default US101;
