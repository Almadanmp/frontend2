import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse} from 'reactstrap';
import SelectSensor from "./US006/SelectSensor";

class US006 extends Component {
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
        <Button onClick={this.toggle} className={"btn-pill"} style={{backgroundColor: '#93c4c4', marginBottom: '1rem'}}><i className="fa fa-plus-square-o fa-lg"/> Add
          Sensor</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card style={{
            textAlign: "center"
          }}>
            <CardBody>
              <span>
                <SelectSensor/>
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

export default US006;
