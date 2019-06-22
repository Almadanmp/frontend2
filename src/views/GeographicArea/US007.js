import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse} from 'reactstrap';
import SelectMotherArea from "./US007/SelectMotherArea";

class US007 extends Component {
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
        <Button onClick={this.toggle} style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Add Geographic Area
        into another Geographic Area</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <span>
                <SelectMotherArea/>
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

export default US007;
