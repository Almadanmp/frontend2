import React, { Component } from 'react';
import {Col, Container, Row } from 'reactstrap';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {collapse: false};
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-between">
            <Col md="9">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">SmartHome      </h1>
                <h2 className="pt-3">       ABOUT</h2>
                <p className="text-muted float-left"> People’s awareness about global warming and pure economic sense are powerful drivers for the current change
                  from a centralized electrical grid to the so-called Smart Grid.</p>

                <p className="text-muted float-left">StudentEnergy.org has a good introduction to the smart grid concept and a very interesting map on energy
                  systems.
                  For further reading, the US Department of Energy has an introductory document.</p>

                <p className="text-muted float-left">One key element of the smart grid is the Smart Home, i.e. a house/apartment that uses IT and networked
                  devices to improve comfort, safety, security and energy efficiency. </p>

                <p className="text-muted float-left">Another important characteristic of many smart homes is that they have electric power generation (e.g. solar
                  panels) and/or storage (e.g. batteries). The smart home is a key element because the residential sector
                  represents about 25% of the total energy consumption in the EU5 (2016). With the introduction of electric
                  cars, which most of them will be charged at home, during off-peak hours (e.g. night), residential sector’s
                  share of the energy consumption will sharply rise.
                </p>
                <p className="text-muted float-left">The consumer management of electrical energy consumption is increasingly important. The objective of this
                  project is to develop a system that allows users to manage the electric energy consumption of a smart
                  home, considering their daily schedule, the weather and energy market prices. </p>

                <p className="text-muted float-left">The system will gather information about energy consumption/production of devices with energy metering
                  and of the home as a whole. </p>
                <img src="https://imgur.com/eG31t7B.png" width="900" height="400"/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;
