import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody, Table, Button, Collapse
} from 'reactstrap';
import SensorTypesSelect from "../US253/SensorTypesSelect";


class US250GetSensors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      sensors: false,
      activeTab: 1,
      roomId: 0,
      link: [],
      collapse: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    fetch(this.props.link.href, {
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then((json) => {
        this.setState({
          item: json,
        })
      })
      .catch(console.log)
  }

  render() {
    var {item} = this.state;
    return (
      <>
        {item.length > 0 ?
          <Table responsive>

            <thead>
            <tr>
              <th>Sensor</th>
              <th>Type</th>
              <th>Activation</th>
              <th>State</th>
            </tr>
            </thead>
            <tbody>

            {item.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.dateStartedFunctioning}</td>
                <td>{item.active == true ? <Badge color="success"> Active </Badge> :
                  <Badge color="danger"> Inactive </Badge>}</td>

              </tr>


            ))}
            </tbody>
          </Table> : "No sensors on this room."}
        <div style={{
          textAlign: "right"
        }}>
          <Button onClick={this.toggle} className={"btn-pill"}
                  style={{backgroundColor: '#93c4c4', marginBottom: '1rem'}}><i
            className="fa fa-plus-square-o fa-lg"/> Add Sensor</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
              <span>
                  <SensorTypesSelect roomID={this.props.roomID} linkAdd={this.props.linkAdd}/>
              </span>
                <span>
              </span>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </>
    );
  }

}

export default US250GetSensors;
