import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, Table} from "reactstrap";
import TableBody from "./TableBody";
import US006Redux from "../US006Redux/US006Redux"

class GetSensors extends Component {

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
      <>
        <Button onClick={this.toggle} style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}}>Get Sensors</Button>
        <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardHeader>
                <strong>Area Sensors from: {this.props.area}</strong>
              </CardHeader>
              <CardBody style={{
                textAlign: "right"
              }}>
                <Table responsive>
                  <TableBody link={this.props.link} area={this.props.area} />
                </Table>
                <US006Redux linkAdd={this.props.linkAdd}/>
              </CardBody>
            </Card>
        </Collapse>
      </>

    )
  }

}


export default GetSensors;
