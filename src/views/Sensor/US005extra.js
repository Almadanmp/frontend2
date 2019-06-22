import React, {Component} from 'react';
import {Collapse, CardBody, Card} from 'reactstrap';
import US005extraRedux from "./US005Extra/US005extraRedux";

import './button.js'
import Button from "reactstrap/es/Button";

class US005extra extends Component {
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
      <div style={{float:'left'}}>
        <Button style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}} onClick={this.toggle} >List of sensor types</Button>
        <Collapse isOpen={this.state.collapse}>
            <CardBody>
              <US005extraRedux/>
            </CardBody>
        </Collapse>
      </div>
    );
  }

}

export default US005extra;




