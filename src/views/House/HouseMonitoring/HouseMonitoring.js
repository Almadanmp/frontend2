import React, {Component} from 'react';
import US600Redux from "./USRedux/US600Redux/US600Redux";
import TwoDatesHouseMonitoring from "./TwoDatesHouseMonitoring"
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import TotalRainfall from "./TotalRainfall";

class HouseMonitoring extends Component {
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
        <h2>Welcome to the House Monitoring Menu.</h2>
        <h4>Please select the option you want to run.</h4>
        <Row>
          <Col xs="12" sm="10" md="4">
            <Card className="card-accent-warning">
              <CardHeader>
                Current Temperature
              </CardHeader>
              <CardBody>
                <br></br>
                <br></br>
                <US600Redux/>
                <br></br>

              </CardBody>
            </Card>
          </Col>


          <Col xs="6" sm="4" md="4">
            <Card className="card-accent-warning">
              <CardHeader>
                Total Rainfall
              </CardHeader>
              <CardBody>
                <TotalRainfall/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col xs="12" sm="9" md="8">
          <Card className="card-accent-warning">
            <CardHeader>
              Period Monitoring
            </CardHeader>
            <CardBody>
              <TwoDatesHouseMonitoring/>
            </CardBody>
          </Card>
        </Col>


      </div>
    );
  }
}

export default HouseMonitoring;
