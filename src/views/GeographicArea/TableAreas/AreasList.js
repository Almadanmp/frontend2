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
        <Col xs="12" lg="10">
          <Card>
            <CardHeader>
              <strong>Geographic Area</strong>
            </CardHeader>
            <CardBody style={{
              textAlign: "right"
            }}>
              <Table>
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
