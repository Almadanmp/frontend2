import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, Table} from "reactstrap";
import TableBody from "./TableBody";
import US007Redux from "../US007Redux/US007Redux";

class GetChildren extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
    console.log(this.props.area)
  }

  render() {

    return (
      <>
        <Button onClick={this.toggle} style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}}>Child Areas</Button>
        <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardHeader>
                <strong>Child Areas from {this.props.area}</strong>
              </CardHeader>
              <CardBody style={{
                textAlign: "right"
              }}>
                <Table responsive>
                  <TableBody link={this.props.link}/>
                </Table>
                <US007Redux geographicAreaId={this.props.geographicAreaId} mother={this.props.area}/>
              </CardBody>
            </Card>
        </Collapse>
      </>

    )
  }

}


export default GetChildren;
