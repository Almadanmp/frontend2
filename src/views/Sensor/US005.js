import React, {Component} from 'react';
import {Collapse, CardBody, Card} from 'reactstrap';
import US005Redux from "./US005/US005Redux";
import Button from "reactstrap/es/Button";

class US005 extends Component {
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
      <div style={{float: 'right'}}>
        <Button className={"btn-pill"} style={{backgroundColor: '#93c4c4', marginBottom: '1rem'}} onClick={this.toggle}><i
          className="fa fa-plus-square-o fa-lg"/> Add Sensor Type</Button>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <US005Redux/>
          </CardBody>
        </Collapse>
      </div>
    );
  }

}

export default US005;
