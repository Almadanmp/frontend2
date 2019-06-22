import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse} from "reactstrap";
import {connect} from "react-redux";
import HouseReadingsDropzone from "./HouseReadingsDropzone";

class ImportHouseReadings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false, name: 'house sensor readings'};
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
      return (
        <div>
          <Button onClick={this.toggle} style={{backgroundColor: '#93c4c4', marginBottom: '2rem'}}
                  class="fa fa-plus-square-o fa-lg mt-4">Import House Sensor Readings </Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
              <span>
              <HouseReadingsDropzone/>
              </span>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ReducersHouseReadings.loading,
  }
};


export default connect(
  mapStateToProps,
  null,
)(ImportHouseReadings);

