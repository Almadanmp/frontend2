import React, {Component} from 'react';
import {Card, CardBody, Col, Form, FormGroup, Input, Label, Table, Row, CardHeader, Alert} from "reactstrap";
import US605GetCurrentTemperature from "./US605GetCurrentTemperature";
import {fetchRooms} from "../../../House/HouseConfiguration/US108/Actions108";
import connect from "react-redux/es/connect/connect";

class US605 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    const {loading, rooms} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    }
    if (rooms.length > 0) {
      return (
        <>
          <Row>
            <Col>
              <Card className="card-accent-warning">
                <CardHeader>
                  Current Temperature
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <CardBody>
                      <tr>
                        <th>Room</th>
                        <th>Temperature</th>
                      </tr>
                      {rooms.map(items => (
                        <tr>
                          <td value={items.name} key={items.name}> {items.name} </td>
                          <td><US605GetCurrentTemperature
                            link={items.links.find((hrefs) => hrefs.rel === 'Get Room Temperature')} />
                          </td>
                        </tr>
                      ))}
                    </CardBody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    else {
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
)(US605);
