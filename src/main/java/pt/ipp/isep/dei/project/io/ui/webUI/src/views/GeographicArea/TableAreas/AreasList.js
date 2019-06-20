import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Table} from "reactstrap";
import TableBody from "./TableBody";
import US003 from "../US003";

class RoomGrid extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <>
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Geographic Area</strong>
            </CardHeader>
            <CardBody style={{
              textAlign: "right"
            }}>
              <Table responsive>
                <TableBody/>
              </Table>
              <US003/>
            </CardBody>
          </Card>
        </Col>
      </>

    )
  }
}

export default RoomGrid;
