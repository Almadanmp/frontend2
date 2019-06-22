import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRooms} from './Actions108';
import {Alert, Card, CardBody, Col, Row, Table} from "reactstrap";

import TableBodyUS108 from "./TableBodyUS108"
import US105 from "../US105";

class US108Redux extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    const headers = {
      name: "Name",
      floor: "Floor",
      height: "Height (m)",
      length: "Length (m)",
      width: "Width (m)",
      edit: "Configure"
    };

    const {loading, rooms} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    }
    if (rooms.length > 0) {
      {
        return (
          <div style={{float:'left'}} className="animated fadeIn">
                <Card>
                  <CardBody>
                    <Table responsive>
                      <TableBodyUS108 headers={headers} rooms={rooms}/>
                    </Table>
                  </CardBody>
                </Card>
            <US105 style={{float:'right'}}/>
          </div>
        );
      }
    } else {
      return (
        <div className="help-block"><Alert color="warning">No rooms on the house</Alert></div>
      )

    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducer108.loading,
    rooms: state.Reducer108.rooms,
    error: state.Reducer108.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => {
      dispatch(fetchRooms())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US108Redux);
