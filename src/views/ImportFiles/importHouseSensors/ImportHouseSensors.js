import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse} from "reactstrap";
import GADropzone from "./HouseSensorsDropzone";

class ImportHouseSensors extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false, name: 'house sensors'};
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} style={{backgroundColor: '#93c4c4', marginBottom: '2rem'}}
                class="fa fa-plus-square-o fa-lg mt-4">Import House Sensors</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <span>
              <GADropzone/>
              </span>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}


export default ImportHouseSensors;


