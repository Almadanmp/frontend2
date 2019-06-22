import React, {Component} from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  CardHeader,
  TabContent, TabPane
} from "reactstrap";
import US250GetSensors from "./US250/US250GetSensors";
import {fetchRooms} from "../../House/HouseConfiguration/US108/Actions108";
import connect from "react-redux/es/connect/connect";


class ListRooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    }
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.onFetchRooms();
  }

  render() {

    const {loading, rooms, error} = this.props;
    if (loading == true) {
      return (<div className="spinner-border" role="status">
        <span className="sr-only"> Loading...</span>
      </div>)
    } else {
      return (
        <>
          <Row>
            <Col xs="12" sm="10" md="10">
              <Card>
                <CardHeader>
                  <strong>Room Sensors by Room</strong>
                  <br></br>
                  <small>Please select the room</small>
                  <div className="card-header-actions">
                  </div>
                </CardHeader>
                <CardBody>
                  {rooms.map(item => (
                    <Row>
                      <Col xs="4">
                        <ListGroup id="list-tab" role="tablist">
                          <ListGroupItem onClick={() => this.toggle(item.name)} action
                                         active={this.state.activeTab === item.name}>{item.name}</ListGroupItem>
                        </ListGroup>
                      </Col>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={item.name}>
                          <US250GetSensors link={item.links.find((hrefs) => hrefs.rel === 'Get Room Sensors')}
                                           roomID={item.name}
                                           linkAdd={item.links.find((hrefs) => hrefs.rel === 'Add a new Room Sensor')}/>
                        </TabPane>
                      </TabContent>
                    </Row>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      );
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
    onFetchRooms: () => {
      dispatch(fetchRooms())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRooms);
