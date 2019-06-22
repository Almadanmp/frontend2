import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse} from 'reactstrap';
import US108Select from "./US108Select";
import SensorTypesSelect from "./SensorTypesSelect";

class US253 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      roomID:0
    };
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
      return (
        <div>
          <Button onClick={this.toggle} style={{backgroundColor: '#93c4c4', marginBottom: '2rem'}}>Add a new
            sensor</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
              <span>
                <SensorTypesSelect roomID = {this.props.roomID}/>
              </span>
                <span>
              </span>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      );
  }
}

export default US253;
