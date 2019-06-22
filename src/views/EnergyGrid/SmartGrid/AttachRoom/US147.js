import React, {Component} from 'react';
import {
  Collapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';
import AttachRoomToGrid from "../../US147/AttachRoomToGrid";

class US147 extends Component {
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
        <Button  onClick={this.toggle} className={"btn-pill"} style={{backgroundColor: '#93c4c4', marginBottom: '1rem'}}><i className="fa fa-plus-square-o fa-lg"/> Attach Room</Button>

        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody style={{
              textAlign: "center"
            }}>
              <AttachRoomToGrid link={this.props.link} grid={this.props.grid}/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default US147;
